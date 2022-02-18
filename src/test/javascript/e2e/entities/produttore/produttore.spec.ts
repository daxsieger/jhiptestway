import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProduttoreComponentsPage, ProduttoreDeleteDialog, ProduttoreUpdatePage } from './produttore.page-object';

const expect = chai.expect;

describe('Produttore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let produttoreComponentsPage: ProduttoreComponentsPage;
  let produttoreUpdatePage: ProduttoreUpdatePage;
  let produttoreDeleteDialog: ProduttoreDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Produttores', async () => {
    await navBarPage.goToEntity('produttore');
    produttoreComponentsPage = new ProduttoreComponentsPage();
    await browser.wait(ec.visibilityOf(produttoreComponentsPage.title), 5000);
    expect(await produttoreComponentsPage.getTitle()).to.eq('jhiptestwayApp.produttore.home.title');
    await browser.wait(ec.or(ec.visibilityOf(produttoreComponentsPage.entities), ec.visibilityOf(produttoreComponentsPage.noResult)), 1000);
  });

  it('should load create Produttore page', async () => {
    await produttoreComponentsPage.clickOnCreateButton();
    produttoreUpdatePage = new ProduttoreUpdatePage();
    expect(await produttoreUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.produttore.home.createOrEditLabel');
    await produttoreUpdatePage.cancel();
  });

  it('should create and save Produttores', async () => {
    const nbButtonsBeforeCreate = await produttoreComponentsPage.countDeleteButtons();

    await produttoreComponentsPage.clickOnCreateButton();

    await promise.all([produttoreUpdatePage.setIdProduttoreInput('5'), produttoreUpdatePage.setDsProduttoreInput('dsProduttore')]);

    await produttoreUpdatePage.save();
    expect(await produttoreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await produttoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Produttore', async () => {
    const nbButtonsBeforeDelete = await produttoreComponentsPage.countDeleteButtons();
    await produttoreComponentsPage.clickOnLastDeleteButton();

    produttoreDeleteDialog = new ProduttoreDeleteDialog();
    expect(await produttoreDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.produttore.delete.question');
    await produttoreDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(produttoreComponentsPage.title), 5000);

    expect(await produttoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
