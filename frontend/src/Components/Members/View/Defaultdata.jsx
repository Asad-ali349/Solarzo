export const tableColumns = [
    
    {
        name: 'Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Email',
        selector: row => row['Email'],
        sortable: false,
        center: true,
    },
    {
        name: 'Phone',
        selector: row => row['Phone'],
        sortable: false,
        center: true,
    },
    {
        name: 'Address',
        selector: row => row['Address'],
        sortable: false,
        center: true,
    },
    {
        name: 'Actions',
        selector: row => row['Action'],
        sortable: false,
        center: true,
    }
];