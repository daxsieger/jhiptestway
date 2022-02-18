import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AssistitoComponentsPage, AssistitoDeleteDialog, AssistitoUpdatePage } from './assistito.page-object';

const expect = chai.expect;

describe('Assistito e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assistitoComponentsPage: AssistitoComponentsPage;
  let assistitoUpdatePage: AssistitoUpdatePage;
  let assistitoDeleteDialog: AssistitoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Assistitos', async () => {
    await navBarPage.goToEntity('assistito');
    assistitoComponentsPage = new AssistitoComponentsPage();
    await browser.wait(ec.visibilityOf(assistitoComponentsPage.title), 5000);
    expect(await assistitoComponentsPage.getTitle()).to.eq('jhiptestwayApp.assistito.home.title');
    await browser.wait(ec.or(ec.visibilityOf(assistitoComponentsPage.entities), ec.visibilityOf(assistitoComponentsPage.noResult)), 1000);
  });

  it('should load create Assistito page', async () => {
    await assistitoComponentsPage.clickOnCreateButton();
    assistitoUpdatePage = new AssistitoUpdatePage();
    expect(await assistitoUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.assistito.home.createOrEditLabel');
    await assistitoUpdatePage.cancel();
  });

  it('should create and save Assistitos', async () => {
    const nbButtonsBeforeCreate = await assistitoComponentsPage.countDeleteButtons();

    await assistitoComponentsPage.clickOnCreateButton();

    await promise.all([assistitoUpdatePage.setIdAssistitoInput('5')]);

    await assistitoUpdatePage.save();
    expect(await assistitoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await assistitoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Assistito', async () => {
    const nbButtonsBeforeDelete = await assistitoComponentsPage.countDeleteButtons();
    await assistitoComponentsPage.clickOnLastDeleteButton();

    assistitoDeleteDialog = new AssistitoDeleteDialog();
    expect(await assistitoDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.assistito.delete.question');
    await assistitoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(assistitoComponentsPage.title), 5000);

    expect(await assistitoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
