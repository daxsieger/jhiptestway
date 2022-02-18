import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StadioComponentsPage, StadioDeleteDialog, StadioUpdatePage } from './stadio.page-object';

const expect = chai.expect;

describe('Stadio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stadioComponentsPage: StadioComponentsPage;
  let stadioUpdatePage: StadioUpdatePage;
  let stadioDeleteDialog: StadioDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Stadios', async () => {
    await navBarPage.goToEntity('stadio');
    stadioComponentsPage = new StadioComponentsPage();
    await browser.wait(ec.visibilityOf(stadioComponentsPage.title), 5000);
    expect(await stadioComponentsPage.getTitle()).to.eq('jhiptestwayApp.stadio.home.title');
    await browser.wait(ec.or(ec.visibilityOf(stadioComponentsPage.entities), ec.visibilityOf(stadioComponentsPage.noResult)), 1000);
  });

  it('should load create Stadio page', async () => {
    await stadioComponentsPage.clickOnCreateButton();
    stadioUpdatePage = new StadioUpdatePage();
    expect(await stadioUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.stadio.home.createOrEditLabel');
    await stadioUpdatePage.cancel();
  });

  it('should create and save Stadios', async () => {
    const nbButtonsBeforeCreate = await stadioComponentsPage.countDeleteButtons();

    await stadioComponentsPage.clickOnCreateButton();

    await promise.all([
      stadioUpdatePage.setIdStadioInput('5'),
      stadioUpdatePage.setDsStadioInput('dsStadio'),
      stadioUpdatePage.processoSelectLastOption(),
    ]);

    await stadioUpdatePage.save();
    expect(await stadioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await stadioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Stadio', async () => {
    const nbButtonsBeforeDelete = await stadioComponentsPage.countDeleteButtons();
    await stadioComponentsPage.clickOnLastDeleteButton();

    stadioDeleteDialog = new StadioDeleteDialog();
    expect(await stadioDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.stadio.delete.question');
    await stadioDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(stadioComponentsPage.title), 5000);

    expect(await stadioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
