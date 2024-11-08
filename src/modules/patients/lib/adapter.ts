import { CreatePatientDto, PatientContract, UpdatePatientDto } from '@api';
import { PatientForm } from '../patients.types';

/**
 * Patients adapter
 */
class PatientsAdapter {
  static patientContractToPatientForm(patient: PatientContract): PatientForm {
    return {
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      description: patient.description
    };
  }

  static patientFormToCreatePatientDto(patient: PatientForm): CreatePatientDto {
    return {
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      description: patient.description
    };
  }

  static patientFormToUpdatePatientDto(patient: PatientForm): UpdatePatientDto {
    return {
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      description: patient.description
    };
  }

  static patientContractToOptionsList(patients: PatientContract[]) {
    return patients.map(patient => ({
      label: `${patient.firstname || ''} ${patient.lastname || ''}`,
      value: patient.id
    }));
  }
}

export { PatientsAdapter };
