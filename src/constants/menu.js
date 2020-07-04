const data = [
  // {
  //   id: "gogo",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.gogo",
  //   to: "/app/gogo",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.start",
  //       to: "/app/gogo/start"
  //     }
  //   ]
  // },
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
        id: "ChchiMan",
        icon: "iconsminds-digital-drawing",
        label: "چی چی من",
        to: "/chichi-man",
        subs: [{
            icon: "simple-icon-user-follow",
            id: "chchiMan-sign",
            label: "ثبت نام",
            to: "/chichi-man/sign-in/:id?/:step?",
        },
            {
                icon: "simple-icon-list",
                id: "chchiMan-list",
                label: "لیست",
                to: "/chichi-man/list",
            },
            {
                icon: "iconsminds-preview",
                id: "chchiMan-situation",
                label: "وضعیت چی چی من ها",
                to: "/chichi-man/situation",
            },
            {
                icon: "simple-icon-present",
                id: "chchiMan-history-orders",
                label: "تاریخچه سفارشات",
                to: "/chichi-man/history-orders",
            },
            {
                icon: "simple-icon-user-follow",
                id: "chchiMan-vote",
                label: "نظر سنجی",
                to: "/chichi-man/vote",
                subs: [{
                    icon: "iconsminds-bar-chart-4",
                    label: "کاربر به چی چی",
                    to: "/chichi-man/vote/users-to-chichi"
                },
                    {
                        icon: "iconsminds-statistic",
                        label: "چی چی به کاربر",
                        to: "/chichi-man/vote/chichi-to-users"
                    }]
            },
            {
                icon: "simple-icon-user-follow",
                id: "chchiMan-statistic",
                label: "آمارها",
                to: "/chichi-man/statistic",
                subs: [{
                    icon: "iconsminds-bar-chart-4",
                    label: "کیفی",
                    to: "/chichi-man/statistic/quality"
                },
                    {
                        icon: "iconsminds-statistic",
                        label: "کمی",
                        to: "/chichi-man/statistic/quantity"
                    }]
            },
            {
                icon: "simple-icon-wallet",
                id: "chchiMan-check-out",
                label: "تسویه حساب ها",
                to: "/chichi-man/check-out",
            },
            {
                icon: "iconsminds-check",
                id: "chchiMan-status",
                label: "وضعیت",
                to: "/chichi-man/status",
            },


            // {
            //     icon: "simple-icon-info",
            //     id: "chchiMan-info",
            //     label: "اطلاعات",
            //     to: "/chichi-man/info",
            //     subs: [{
            //         icon: "iconsminds-smartphone-4",
            //         label: "سفر فعلی",
            //         to: "/chichi-man/info/current-trip"
            //     },{
            //         icon: "iconsminds-smartphone-4",
            //         label: "اصلی",
            //         to: "/chichi-man/info/main"
            //     }, {
            //         icon: "iconsminds-smartphone-4",
            //         label: "تسویه حساب",
            //         to: "/chichi-man/info/check-out"
            //     }, {
            //         icon: "iconsminds-smartphone-4",
            //         label: "نتایج کلی نظرسنجی ها",
            //         to: "/chichi-man/info/vote"
            //     }, {
            //         icon: "iconsminds-smartphone-4",
            //         label: "آمارها",
            //         to: "/chichi-man/info/static"
            //     },{
            //         icon: "iconsminds-smartphone-4",
            //         label: "اطلاعات ثبت نام",
            //         to: "/chichi-man/info/submit-info"
            //     },{
            //         icon: "iconsminds-smartphone-4",
            //         label: "تاریخچه سفرها ",
            //         to: "/chichi-man/info/trip-history"
            //     }
            //     ,{
            //         icon: "iconsminds-smartphone-4",
            //         label: "وضعیت ها",
            //         to: "/chichi-man/info/situation"
            //     },
            //     ]
            // },

        ]
    },
    {
        id: "HomePages",
        icon: "iconsminds-monitor---phone",
        label: "صفحه اصلی",
        to: "/home-page",
        subs: [{
            icon: "iconsminds-smartphone-4",
            id: "mobilehomepage",
            label: "صفحه اصلی موبایل",
            to: "/home-page/main",
            subs: [{
                icon: "iconsminds-smartphone-4",
                label: "create",
                to: "/home-page/main/create"
            }, {
                icon: "iconsminds-smartphone-4",
                label: "edit",
                to: "/home-page/main/edit/:name?"
            }, {
                icon: "iconsminds-smartphone-4",
                label: "active",
                to: "/home-page/main/active"
            },
            ]
        },
            // {
            //     icon: "iconsminds-smartphone-4",
            //     id: "mobilehomepage",
            //     label: "crop img",
            //     to: "/home-page/crop-img",
            // },
            {
                icon: "iconsminds-smartphone-4",
                id: "header-slider",
                label: "اسلایدر بالای صفحه",
                to: "/home-page/header-slider",
            },
            {
                icon: "iconsminds-smartphone-4",
                id: "categories-home-page",
                label: "دسته بندی",
                to: "/home-page/categories",
            },
            {
                icon: "iconsminds-smartphone-4",
                id: "wonder-package-home-page",
                label: "پکیج های شگفت انگیز",
                to: "/home-page/wonder-package",
            },
            {
                icon: "iconsminds-smartphone-4",
                id: "wonder-package-home-page",
                label: "اسلایدر",
                to: "/home-page/slider",
            },
            {
                icon: "iconsminds-smartphone-4",
                id: "banner-home-page",
                label: "بنر",
                to: "/home-page/banner",
            },
            {
                icon: "iconsminds-project",
                id: "item-list-home-page",
                label: "آیتم",
                to: "/home-page/item-list",
            },
        ]
    }
  // {
  //   id: "secondmenu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.second-menu",
  //   to: "/app/second-menu",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.second",
  //       to: "/app/second-menu/second"
  //     }
  //   ]
  // },
  // {
  //   id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow:true
  // }
];
export default data;
