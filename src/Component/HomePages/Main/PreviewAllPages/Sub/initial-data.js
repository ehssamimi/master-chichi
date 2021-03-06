const initialData = {
    tasks: {
        // 'item-1': {
        //     id: 'item-1',
        //     ObjectType: 'Category',
        //     Position: 1,
        //     Data: {
        //         Title: "دسته بندی",
        //         Data: [{
        //             _id: "id",
        //             Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e",
        //             Position: 0,
        //             DestinationId: "Id"
        //         }, {
        //             _id: "id",
        //             Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e",
        //             Position: 1,
        //             DestinationId: "Id"
        //         }, {
        //             _id: "id",
        //             Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e",
        //             Position: 2,
        //             DestinationId: "Id"
        //         }, {
        //             _id: "id",
        //             Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e",
        //             Position: 3,
        //             DestinationId: "Id"
        //         }]
        //     }
        // },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Header',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            title: 'Body',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Footer',
            taskIds: []
        }
    },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'], add:false,column:'',header:'', NewData:{}
};

export default initialData
