import produce from 'immer';
import { add, differenceInCalendarDays } from 'date-fns';
import {
  Drug, PrescribedDrug, TaperingConfiguration, ToDays,
} from '../../types';
import {
  ADD_TAPER_CONFIG_FAILURE,
  ADD_TAPER_CONFIG_REQUEST,
  ADD_TAPER_CONFIG_SUCCESS,
  AddTaperConfigFailureAction,
  AddTaperConfigRequestAction,
  AddTaperConfigSuccessAction,
  CLEAR_SCHEDULE,
  ClearScheduleAction,
  GENERATE_SCHEDULE,
  GenerateScheduleAction,
  SHARE_WITH_PATIENT_APP_FAILURE,
  SHARE_WITH_PATIENT_APP_REQUEST,
  SHARE_WITH_PATIENT_APP_SUCCESS,
  SHARE_WITH_PATIENT_EMAIL_FAILURE,
  SHARE_WITH_PATIENT_EMAIL_REQUEST,
  SHARE_WITH_PATIENT_EMAIL_SUCCESS,
  ShareWithPatientAppFailure,
  ShareWithPatientAppRequest,
  ShareWithPatientAppSuccess,
  ShareWithPatientEmailFailure,
  ShareWithPatientEmailRequest,
  ShareWithPatientEmailSuccess,
  ADD_NEW_DRUG_FORM,
  AddNewDrugFormAction,
  REMOVE_DRUG_FORM,
  RemoveDrugFormAction,
  ToggleShareProjectedScheduleWithPatient,
  TOGGLE_SHARE_PROJECTED_SCHEDULE_WITH_PATIENT,
  CHANGE_MESSAGE_FOR_PATIENT,
  INTERVAL_COUNT_CHANGE,
  INTERVAL_END_DATE_CHANGE,
  INTERVAL_START_DATE_CHANGE,
  INTERVAL_UNIT_CHANGE,
  ChangeMessageForPatient,
  IntervalConfigActions,
} from '../actions/taperConfig';
import drugs from './drugs';

import {
  CHOOSE_BRAND,
  CHOOSE_FORM,
  CURRENT_DOSAGE_CHANGE,
  DRUG_NAME_CHANGE,
  NEXT_DOSAGE_CHANGE,
  PrescriptionFormActions,
} from '../../components/PrescriptionForm/actions';
import { Schedule } from '../../components/ProjectedSchedule';
import { chartDataConverter, ScheduleChartData, scheduleGenerator } from './utils';

export interface TaperConfigState {
  drugs: Drug[];
  taperConfigs: TaperingConfiguration[];
  lastPrescriptionFormId: number;
  prescriptionFormIds: number[];
  prescribedDrugs: PrescribedDrug[];

  projectedSchedule: Schedule;
  scheduleChartData: ScheduleChartData;

  intervalStartDate: Date,
  intervalEndDate: Date | null,
  intervalCount: number,
  intervalUnit: 'Days'|'Weeks'|'Months',
  intervalDurationDays: number,

  messageForPatient: string;
  shareProjectedScheduleWithPatient: boolean;
  showMessageForPatient: boolean;

  addingTaperConfig: boolean;
  addedTaperConfig: boolean;
  addingTaperConfigError: any;

  sharingWithPatientApp: boolean;
  sharedWithPatientApp: boolean;
  sharingWithPatientAppError: any;

  sharingWithPatientEmail: boolean;
  sharedWithPatientEmail: boolean;
  sharingWithPatientEmailError: any;
}

export const initialState: TaperConfigState = {
  drugs,
  taperConfigs: [],
  lastPrescriptionFormId: 0,
  prescriptionFormIds: [0],
  prescribedDrugs: [{
    id: 0,
    name: '',
    brand: '',
    form: '',
    currentDosages: [],
    nextDosages: [],
  }],
  projectedSchedule: {
    startDates: {}, endDates: {}, data: [], drugs: [],
  },
  scheduleChartData: [],

  intervalStartDate: new Date(),
  intervalEndDate: null,
  intervalCount: 0,
  intervalUnit: 'Days',
  intervalDurationDays: 0,

  messageForPatient: '',
  shareProjectedScheduleWithPatient: false,
  showMessageForPatient: false,

  addingTaperConfig: false,
  addedTaperConfig: false,
  addingTaperConfigError: null,

  sharingWithPatientApp: false,
  sharedWithPatientApp: false,
  sharingWithPatientAppError: null,

  sharingWithPatientEmail: false,
  sharedWithPatientEmail: false,
  sharingWithPatientEmailError: null,
};

export type TaperConfigActions =
  | AddTaperConfigRequestAction
  | AddTaperConfigSuccessAction
  | AddTaperConfigFailureAction
  | AddNewDrugFormAction
  | RemoveDrugFormAction
  | GenerateScheduleAction
  | ClearScheduleAction
  | ChangeMessageForPatient
  | ToggleShareProjectedScheduleWithPatient
  | ShareWithPatientAppRequest
  | ShareWithPatientAppSuccess
  | ShareWithPatientAppFailure
  | ShareWithPatientEmailRequest
  | ShareWithPatientEmailSuccess
  | ShareWithPatientEmailFailure
  | IntervalConfigActions
  | PrescriptionFormActions;

const taperConfigReducer = (state: TaperConfigState = initialState, action: TaperConfigActions) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_TAPER_CONFIG_REQUEST:
        draft.addingTaperConfig = true;
        draft.addedTaperConfig = false;
        draft.addingTaperConfigError = null;
        break;

      case ADD_TAPER_CONFIG_SUCCESS:
        draft.addingTaperConfig = false;
        draft.addedTaperConfig = true;
        draft.taperConfigs.unshift(action.data);
        break;

      case ADD_TAPER_CONFIG_FAILURE:
        draft.addingTaperConfig = false;
        draft.addedTaperConfig = false;
        draft.addingTaperConfigError = action.error;
        break;

      case ADD_NEW_DRUG_FORM:
        draft.prescriptionFormIds.push(draft.lastPrescriptionFormId + 1);
        draft.prescribedDrugs.push({
          id: draft.lastPrescriptionFormId + 1,
          name: '',
          brand: '',
          form: '',
          currentDosages: [],
          nextDosages: [],
        });
        draft.lastPrescriptionFormId += 1;
        break;

      case REMOVE_DRUG_FORM:
        draft.prescriptionFormIds = draft.prescriptionFormIds.filter((id) => id !== action.data);
        draft.prescribedDrugs = draft.prescribedDrugs.filter((drug) => drug.id !== action.data);
        break;

      case GENERATE_SCHEDULE:
        draft.projectedSchedule = scheduleGenerator(draft.prescribedDrugs, draft.intervalStartDate, draft.intervalEndDate!);
        // draft.scheduleChartData = chartDataConverter(draft.projectedSchedule);
        draft.showMessageForPatient = true;
        break;

      case CLEAR_SCHEDULE:
        draft.projectedSchedule = {
          startDates: {}, endDates: {}, data: [], drugs: [],
        };
        draft.scheduleChartData = [];
        draft.showMessageForPatient = false;
        break;

      case SHARE_WITH_PATIENT_APP_REQUEST:
        draft.sharingWithPatientApp = true;
        draft.sharedWithPatientApp = false;
        draft.sharingWithPatientAppError = null;
        break;

      case SHARE_WITH_PATIENT_APP_SUCCESS:
        draft.sharingWithPatientApp = false;
        draft.sharedWithPatientApp = true;
        break;

      case SHARE_WITH_PATIENT_APP_FAILURE:
        draft.sharingWithPatientApp = false;
        draft.sharingWithPatientAppError = action.error;
        break;

      case SHARE_WITH_PATIENT_EMAIL_REQUEST:
        draft.sharingWithPatientEmail = true;
        draft.sharedWithPatientEmail = false;
        draft.sharingWithPatientEmailError = null;
        break;

      case SHARE_WITH_PATIENT_EMAIL_SUCCESS:
        draft.sharingWithPatientEmail = false;
        draft.sharedWithPatientEmail = true;
        break;

      case SHARE_WITH_PATIENT_EMAIL_FAILURE:
        draft.sharingWithPatientEmail = false;
        draft.sharingWithPatientEmailError = action.error;
        break;

      case CHANGE_MESSAGE_FOR_PATIENT:
        draft.messageForPatient = action.data;
        break;

      case TOGGLE_SHARE_PROJECTED_SCHEDULE_WITH_PATIENT:
        draft.shareProjectedScheduleWithPatient = !draft.shareProjectedScheduleWithPatient;
        break;

      case DRUG_NAME_CHANGE: {
        const drug = draft.prescribedDrugs.find((d) => d.id === action.data.id)!;
        drug.name = action.data.name;
        drug.brand = '';
        drug.form = '';
        drug.currentDosages = [];
        drug.nextDosages = [];
        break;
      }

      case CHOOSE_BRAND: {
        const drug = draft.prescribedDrugs.find((d) => d.id === action.data.id)!;
        drug.brand = action.data.brand;
        drug.form = '';
        drug.currentDosages = [];
        drug.nextDosages = [];
        break;
      }

      case CHOOSE_FORM: {
        const drug = draft.prescribedDrugs.find((d) => d.id === action.data.id)!;
        drug.form = action.data.form;
        drug.currentDosages = [];
        drug.nextDosages = [];
        break;
      }

      case CURRENT_DOSAGE_CHANGE: {
        const drug = draft.prescribedDrugs.find((d) => d.id === action.data.id)!;
        const idx = drug.currentDosages.findIndex(
          (curDosage) => curDosage.dosage === action.data.dosage.dosage,
        );

        if (idx === -1) {
          drug.currentDosages.push(action.data.dosage);
        } else {
          drug.currentDosages[idx] = action.data.dosage;
        }
        break;
      }

      case NEXT_DOSAGE_CHANGE: {
        const drug = draft.prescribedDrugs.find((d) => d.id === action.data.id)!;
        const idx = drug.nextDosages.findIndex(
          (nextDosage) => nextDosage.dosage === action.data.dosage.dosage,
        );

        if (idx === -1) {
          drug.nextDosages.push(action.data.dosage);
        } else {
          drug.nextDosages[idx] = action.data.dosage;
        }
        break;
      }

      case INTERVAL_START_DATE_CHANGE:
        console.log('INTERVAL_START_DATE_CHANGE');
        console.log(action.data);
        draft.intervalStartDate = action.data.date;
        if (draft.intervalEndDate) {
          draft.intervalDurationDays = differenceInCalendarDays(draft.intervalEndDate, draft.intervalStartDate);
        }
        break;

      case INTERVAL_END_DATE_CHANGE: {
        draft.intervalEndDate = action.data.date;
        break;
      }

      case INTERVAL_UNIT_CHANGE: {
        draft.intervalUnit = action.data.unit;
        draft.intervalDurationDays = ToDays[draft.intervalUnit] * draft.intervalCount;
        draft.intervalEndDate = add(draft.intervalStartDate, { [draft.intervalUnit.toLowerCase()]: draft.intervalCount });
        break;
      }

      case INTERVAL_COUNT_CHANGE: {
        draft.intervalCount = action.data.count;
        draft.intervalDurationDays = ToDays[draft.intervalUnit] * draft.intervalCount;
        draft.intervalEndDate = add(draft.intervalStartDate, { [draft.intervalUnit.toLowerCase()]: draft.intervalCount });
        break;
      }

      default:
        return state;
    }
  });
};

export default taperConfigReducer;
