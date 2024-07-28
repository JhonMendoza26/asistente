import { MessageResponse } from '@app/interface/message-response';
import { EtapaContacto } from '@app/interface/etapa-contacto';

export interface EtapasDescripcionResponse extends MessageResponse {
  descripcionEtapa: EtapaContacto;
}
