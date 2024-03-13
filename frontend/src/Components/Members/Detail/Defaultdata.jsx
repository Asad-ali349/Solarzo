export const tableColumns = [
    
    {
        name: 'Stock',
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