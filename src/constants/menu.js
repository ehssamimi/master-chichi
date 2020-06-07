const data = [
  {
    id: "gogo",
    icon: "iconsminds-air-balloon-1",
    label: "menu.gogo",
    to: "/app/gogo",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/gogo/start"
      }     
    ]
  },
    {
        id: "content",
        icon: "iconsminds-mail",
        label: "محتوا",
        to: "/content",
        subs: [{
            icon: "iconsminds-smartphone-4",
            id: "product",
            label: "محصولات",
            to: "/content/product",
            subs: [{
                icon: "iconsminds-posterous",
                label: "همه",
                to: "/content/product/all"
            }, {
                icon: "iconsminds-add",
                label: "اضافه کردن",
                to: "/content/product/add/:Id?"
            },
                //     {
                //     icon: "iconsminds-file-edit",
                //     label: "حذف و ویرایش",
                //     to: "/content/product/delete-edit"
                // },
                //
            ]
        },
            {
                icon: "iconsminds-posterous",
                id: "categories",
                label: "دسته بندی",
                to: "/content/category",
                subs: [{
                    icon: "iconsminds-posterous",
                    label: "همه",
                    to: "/content/category/all"
                }, {
                    icon: "iconsminds-add",
                    label: "اضافه کردن",
                    to: "/content/category/add"
                },
                    //     {
                    //     icon: "iconsminds-file-edit",
                    //     label: "حذف و ویرایش",
                    //     to: "/content/category/delete-edit"
                    // },
                ]
            },
            // {
            //     icon: "iconsminds-delicious",
            //     id: "sub-category",
            //     label: "زیر دسته",
            //     to: "/content/sub-category",
            //     subs: [{
            //         icon: "iconsminds-posterous",
            //         label: "همه",
            //         to: "/content/sub-category/all"
            //     }, {
            //         icon: "iconsminds-add",
            //         label: "اضاقه کردن",
            //         to: "/content/sub-category/add"
            //     }, {
            //         icon: "iconsminds-file-edit",
            //         label: "حذف و ویرایش",
            //         to: "/content/sub-category/delete-edit"
            //     },
            //     ]
            // },


        ]
    },
  {
    id: "secondmenu",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second"
      }
    ]
  },
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/blank-page"
  },
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }
];
export default data;
