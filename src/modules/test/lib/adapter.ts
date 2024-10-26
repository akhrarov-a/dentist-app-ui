/**
 * Test adapter
 */
class TestAdapter {
  static testContractToTestForm(department: any): any {
    return department;
  }

  static testFormToTestDto(department: any): any {
    return department;
  }

  static testsToOptionsList(departments: any[]) {
    return departments.map((department) => ({
      label: department.name,
      value: department.id,
    }));
  }
}

export { TestAdapter };
