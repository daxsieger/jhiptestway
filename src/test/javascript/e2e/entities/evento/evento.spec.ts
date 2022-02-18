import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventoComponentsPage, EventoDeleteDialog, EventoUpdatePage } from './evento.page-object';

const expect = chai.expect;

describe('Evento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventoComponentsPage: EventoComponentsPage;
  let eventoUpdatePage: EventoUpdatePage;
  let eventoDeleteDialog: EventoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Eventos', async () => {
    await navBarPage.goToEntity('evento');
    eventoComponentsPage = new EventoComponentsPage();
    await browser.wait(ec.visibilityOf(eventoComponentsPage.title), 5000);
    expect(await eventoComponentsPage.getTitle()).to.eq('jhiptestwayApp.evento.home.title');
    await browser.wait(ec.or(ec.visibilityOf(eventoComponentsPage.entities), ec.visibilityOf(eventoComponentsPage.noResult)), 1000);
  });

  it('should load create Evento page', async () => {
    await eventoComponentsPage.clickOnCreateButton();
    eventoUpdatePage = new EventoUpdatePage();
    expect(await eventoUpdatePage.getPageTitle()).to.eq('jhiptestwayApp.evento.home.createOrEditLabel');
    await eventoUpdatePage.cancel();
  });

  it('should create and save Eventos', async () => {
    const nbButtonsBeforeCreate = await eventoComponentsPage.countDeleteButtons();

    await eventoComponentsPage.clickOnCreateButton();

    await promise.all([
      eventoUpdatePage.setIdEventoInput('5'),
      eventoUpdatePage.setTsEventoInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      eventoUpdatePage.setNoteInput('note'),
      eventoUpdatePage.assistitoSelectLastOption(),
      eventoUpdatePage.tipoSelectLastOption(),
      eventoUpdatePage.gestoreSelectLastOption(),
      eventoUpdatePage.origineSelectLastOption(),
      // eventoUpdatePage.statiSelectLastOption(),
    ]);

    await eventoUpdatePage.save();
    expect(await eventoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Evento', async () => {
    const nbButtonsBeforeDelete = await eventoComponentsPage.countDeleteButtons();
    await eventoComponentsPage.clickOnLastDeleteButton();

    eventoDeleteDialog = new EventoDeleteDialog();
    expect(await eventoDeleteDialog.getDialogTitle()).to.eq('jhiptestwayApp.evento.delete.question');
    await eventoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(eventoComponentsPage.title), 5000);

    expect(await eventoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
