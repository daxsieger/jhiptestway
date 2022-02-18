import { element, by, ElementFinder } from 'protractor';

export class EventoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-evento div table .btn-danger'));
  title = element.all(by.css('jhi-evento div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EventoUpdatePage {
  pageTitle = element(by.id('jhi-evento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idEventoInput = element(by.id('field_idEvento'));
  tsEventoInput = element(by.id('field_tsEvento'));
  noteInput = element(by.id('field_note'));

  assistitoSelect = element(by.id('field_assistito'));
  tipoSelect = element(by.id('field_tipo'));
  gestoreSelect = element(by.id('field_gestore'));
  origineSelect = element(by.id('field_origine'));
  statiSelect = element(by.id('field_stati'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdEventoInput(idEvento: string): Promise<void> {
    await this.idEventoInput.sendKeys(idEvento);
  }

  async getIdEventoInput(): Promise<string> {
    return await this.idEventoInput.getAttribute('value');
  }

  async setTsEventoInput(tsEvento: string): Promise<void> {
    await this.tsEventoInput.sendKeys(tsEvento);
  }

  async getTsEventoInput(): Promise<string> {
    return await this.tsEventoInput.getAttribute('value');
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  async assistitoSelectLastOption(): Promise<void> {
    await this.assistitoSelect.all(by.tagName('option')).last().click();
  }

  async assistitoSelectOption(option: string): Promise<void> {
    await this.assistitoSelect.sendKeys(option);
  }

  getAssistitoSelect(): ElementFinder {
    return this.assistitoSelect;
  }

  async getAssistitoSelectedOption(): Promise<string> {
    return await this.assistitoSelect.element(by.css('option:checked')).getText();
  }

  async tipoSelectLastOption(): Promise<void> {
    await this.tipoSelect.all(by.tagName('option')).last().click();
  }

  async tipoSelectOption(option: string): Promise<void> {
    await this.tipoSelect.sendKeys(option);
  }

  getTipoSelect(): ElementFinder {
    return this.tipoSelect;
  }

  async getTipoSelectedOption(): Promise<string> {
    return await this.tipoSelect.element(by.css('option:checked')).getText();
  }

  async gestoreSelectLastOption(): Promise<void> {
    await this.gestoreSelect.all(by.tagName('option')).last().click();
  }

  async gestoreSelectOption(option: string): Promise<void> {
    await this.gestoreSelect.sendKeys(option);
  }

  getGestoreSelect(): ElementFinder {
    return this.gestoreSelect;
  }

  async getGestoreSelectedOption(): Promise<string> {
    return await this.gestoreSelect.element(by.css('option:checked')).getText();
  }

  async origineSelectLastOption(): Promise<void> {
    await this.origineSelect.all(by.tagName('option')).last().click();
  }

  async origineSelectOption(option: string): Promise<void> {
    await this.origineSelect.sendKeys(option);
  }

  getOrigineSelect(): ElementFinder {
    return this.origineSelect;
  }

  async getOrigineSelectedOption(): Promise<string> {
    return await this.origineSelect.element(by.css('option:checked')).getText();
  }

  async statiSelectLastOption(): Promise<void> {
    await this.statiSelect.all(by.tagName('option')).last().click();
  }

  async statiSelectOption(option: string): Promise<void> {
    await this.statiSelect.sendKeys(option);
  }

  getStatiSelect(): ElementFinder {
    return this.statiSelect;
  }

  async getStatiSelectedOption(): Promise<string> {
    return await this.statiSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EventoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-evento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-evento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
