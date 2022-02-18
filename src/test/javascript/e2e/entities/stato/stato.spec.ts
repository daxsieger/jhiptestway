import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StatoComponentsPage, StatoDeleteDialog, StatoUpdatePage } from './stato.page-object';

const expect = chai.expect;

describe('Stato e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statoComponentsPage: StatoComponentsPage;
  let statoUpdatePage: StatoUpdatePage;
  let statoDeleteDialog: StatoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Statoes', async () => {
    await navBarPage.goToEntity('stato');
    statoComponentsPage = new StatoComponentsPage();
    await browser.wait(ec.visibilityOf(statoComponentsPage.title), 5000);
    expect(await statoComponentsPage.getTitle()).to.eq('jhiptestwayApp.stato.home.title');
    await browser.wait(ec.or(ec.visibilityOf(statoComponentsPage.entities), ec.visibilityOf(statoComponentsPage.noResult)), 1000);
  });

  it('should load create Stato page', async () => {
    await statoComponentsPage.clickOnCreateButton();
    statoUpdatePage = new StatoUpdatePage();
    expect(await statoUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.stato.home.createOrEditLabel');
    await statoUpdatePage.cancel();
  });

  it('should create and save Statoes', async () => {
    const nbButtonsBeforeCreate = await statoComponentsPage.countDeleteButtons();

    await statoComponentsPage.clickOnCreateButton();

    await promise.all([
      statoUpdatePage.setIdStadioInput('5'),
      statoUpdatePage.setDsStadioInput('dsStadio'),
      statoUpdatePage.setTsCambioStatoInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      statoUpdatePage.stadioSelectLastOption(),
    ]);

    await statoUpdatePage.save();
    expect(await statoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Stato', async () => {
    const nbButtonsBeforeDelete = await statoComponentsPage.countDeleteButtons();
    await statoComponentsPage.clickOnLastDeleteButton();

    statoDeleteDialog = new StatoDeleteDialog();
    expect(await statoDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.stato.delete.question');
    await statoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(statoComponentsPage.title), 5000);

    expect(await statoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
