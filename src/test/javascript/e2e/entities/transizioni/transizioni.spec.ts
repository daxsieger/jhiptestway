import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TransizioniComponentsPage, TransizioniDeleteDialog, TransizioniUpdatePage } from './transizioni.page-object';

const expect = chai.expect;

describe('Transizioni e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transizioniComponentsPage: TransizioniComponentsPage;
  let transizioniUpdatePage: TransizioniUpdatePage;
  let transizioniDeleteDialog: TransizioniDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Transizionis', async () => {
    await navBarPage.goToEntity('transizioni');
    transizioniComponentsPage = new TransizioniComponentsPage();
    await browser.wait(ec.visibilityOf(transizioniComponentsPage.title), 5000);
    expect(await transizioniComponentsPage.getTitle()).to.eq('jhiptestwayApp.transizioni.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(transizioniComponentsPage.entities), ec.visibilityOf(transizioniComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Transizioni page', async () => {
    await transizioniComponentsPage.clickOnCreateButton();
    transizioniUpdatePage = new TransizioniUpdatePage();
    expect(await transizioniUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.transizioni.home.createOrEditLabel');
    await transizioniUpdatePage.cancel();
  });

  it('should create and save Transizionis', async () => {
    const nbButtonsBeforeCreate = await transizioniComponentsPage.countDeleteButtons();

    await transizioniComponentsPage.clickOnCreateButton();

    await promise.all([
      transizioniUpdatePage.setIdTransizioneInput('5'),
      transizioniUpdatePage.setDsTransizioneInput('dsTransizione'),
      transizioniUpdatePage.processoSelectLastOption(),
      transizioniUpdatePage.stadioInizialeSelectLastOption(),
      transizioniUpdatePage.stadioFinaleSelectLastOption(),
    ]);

    await transizioniUpdatePage.save();
    expect(await transizioniUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transizioniComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Transizioni', async () => {
    const nbButtonsBeforeDelete = await transizioniComponentsPage.countDeleteButtons();
    await transizioniComponentsPage.clickOnLastDeleteButton();

    transizioniDeleteDialog = new TransizioniDeleteDialog();
    expect(await transizioniDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.transizioni.delete.question');
    await transizioniDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(transizioniComponentsPage.title), 5000);

    expect(await transizioniComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
