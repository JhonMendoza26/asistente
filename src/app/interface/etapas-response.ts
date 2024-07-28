import { EtapasSeguimiento } from '@app/interface/etapas-seguimiento';
import { MessageResponse } from '@app/interface/message-response';

export interface EtapasResponse extends MessageResponse{
  etapas: EtapasSeguimiento[];
}
