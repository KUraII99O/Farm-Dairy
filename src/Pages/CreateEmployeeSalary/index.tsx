import EmployeeSalaryForm from '../../component/EmployeeSalary/Form'

const EmployeeSalaryPage = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <EmployeeSalaryForm/>
        </div>
    </div>
  )
}

export default EmployeeSalaryPage
