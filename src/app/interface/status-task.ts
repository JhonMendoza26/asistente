export interface StatusTask {
  //Estatus anterior
  backStatusID: number;
  backStatusName: string;
  //Estatus actual
  currentStatusID: number;
  currentStatusName: string;
  currentValueBar: string;
  currentStatusPercentage: number;
  //Estatus siguiente
  nextStatusID: number;
  nextStatusName: string;
}
