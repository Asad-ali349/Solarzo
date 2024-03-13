export const tableColumns = [
    
    {
        name: 'Team Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Available Quantity',
        selector: row => row['Quantity'],
        sortable: false,
        center: true,
    },
];