import { CreatePatientDto, PatientContract, UpdatePatientDto } from '@api';
import { PatientForm } from '../patients.types.ts';

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

  static patientsContractToOptionsList(patients: any[]) {
    return patients.map(patient => ({
      label: patient.name,
      value: patient.id
    }));
  }
}

export { PatientsAdapter };
