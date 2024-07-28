import { MessageResponse } from '@app/interface/message-response';
import { Contacto } from '@app/interface/contacto';

export interface ContactoResponse extends MessageResponse {
  contacto?: Contacto;
}
