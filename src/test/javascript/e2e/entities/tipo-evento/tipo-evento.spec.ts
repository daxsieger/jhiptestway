import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoEventoComponentsPage, TipoEventoDeleteDialog, TipoEventoUpdatePage } from './tipo-evento.page-object';

const expect = chai.expect;

describe('TipoEvento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoEventoComponentsPage: TipoEventoComponentsPage;
  let tipoEventoUpdatePage: TipoEventoUpdatePage;
  let tipoEventoDeleteDialog: TipoEventoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoEventos', async () => {
    await navBarPage.goToEntity('tipo-evento');
    tipoEventoComponentsPage = new TipoEventoComponentsPage();
    await browser.wait(ec.visibilityOf(tipoEventoComponentsPage.title), 5000);
    expect(await tipoEventoComponentsPage.getTitle()).to.eq('jhiptestwayApp.tipoEvento.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tipoEventoComponentsPage.entities), ec.visibilityOf(tipoEventoComponentsPage.noResult)), 1000);
  });

  it('should load create TipoEvento page', async () => {
    await tipoEventoComponentsPage.clickOnCreateButton();
    tipoEventoUpdatePage = new TipoEventoUpdatePage();
    expect(await tipoEventoUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.tipoEvento.home.createOrEditLabel');
    await tipoEventoUpdatePage.cancel();
  });

  it('should create and save TipoEventos', async () => {
    const nbButtonsBeforeCreate = await tipoEventoComponentsPage.countDeleteButtons();

    await tipoEventoComponentsPage.clickOnCreateButton();

    await promise.all([tipoEventoUpdatePage.setIdTipoEventoInput('5'), tipoEventoUpdatePage.setDsTipoEventoInput('dsTipoEvento')]);

    await tipoEventoUpdatePage.save();
    expect(await tipoEventoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoEventoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoEvento', async () => {
    const nbButtonsBeforeDelete = await tipoEventoComponentsPage.countDeleteButtons();
    await tipoEventoComponentsPage.clickOnLastDeleteButton();

    tipoEventoDeleteDialog = new TipoEventoDeleteDialog();
    expect(await tipoEventoDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.tipoEvento.delete.question');
    await tipoEventoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(tipoEventoComponentsPage.title), 5000);

    expect(await tipoEventoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
