import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcessoComponentsPage, ProcessoDeleteDialog, ProcessoUpdatePage } from './processo.page-object';

const expect = chai.expect;

describe('Processo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let processoComponentsPage: ProcessoComponentsPage;
  let processoUpdatePage: ProcessoUpdatePage;
  let processoDeleteDialog: ProcessoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Processos', async () => {
    await navBarPage.goToEntity('processo');
    processoComponentsPage = new ProcessoComponentsPage();
    await browser.wait(ec.visibilityOf(processoComponentsPage.title), 5000);
    expect(await processoComponentsPage.getTitle()).to.eq('jhiptestwayApp.processo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(processoComponentsPage.entities), ec.visibilityOf(processoComponentsPage.noResult)), 1000);
  });

  it('should load create Processo page', async () => {
    await processoComponentsPage.clickOnCreateButton();
    processoUpdatePage = new ProcessoUpdatePage();
    expect(await processoUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.processo.home.createOrEditLabel');
    await processoUpdatePage.cancel();
  });

  it('should create and save Processos', async () => {
    const nbButtonsBeforeCreate = await processoComponentsPage.countDeleteButtons();

    await processoComponentsPage.clickOnCreateButton();

    await promise.all([processoUpdatePage.setIdProcessoInput('5'), processoUpdatePage.setDsProcessoInput('dsProcesso')]);

    await processoUpdatePage.save();
    expect(await processoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await processoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Processo', async () => {
    const nbButtonsBeforeDelete = await processoComponentsPage.countDeleteButtons();
    await processoComponentsPage.clickOnLastDeleteButton();

    processoDeleteDialog = new ProcessoDeleteDialog();
    expect(await processoDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.processo.delete.question');
    await processoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(processoComponentsPage.title), 5000);

    expect(await processoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
