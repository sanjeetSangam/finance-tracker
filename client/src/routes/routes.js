const backendUrl = import.meta.env.VITE_API_URL;

export const loginRoute = `${backendUrl}/api/auth/login`;
export const registerRoute = `${backendUrl}/api/auth/register`;
export const getIncomeRoute = `${backendUrl}/api/income`;
export const getExpenseRoute = `${backendUrl}/api/expense`;
export const addIncomeRoute = `${backendUrl}/api/income/add-income`;
export const addExpenseRoute = `${backendUrl}/api/expense/add-expense`;
