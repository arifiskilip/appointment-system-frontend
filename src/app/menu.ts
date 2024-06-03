export class MenuModel{
    name: string = "";
    icon: string = "";
    url: string = "";
    isTitle: boolean = false;
    subMenus: MenuModel[] = [];
}

export const AdminMenus: MenuModel[] = [
    {
        name: "Ana Sayfa",
        icon: "fa-solid fa-home",
        url: "/admin",
        isTitle: false,
        subMenus: []
    },
    {
        name: "Doktorlar",
        icon: "fa-solid fa-user",
        url: "/admin/doctor",
        isTitle: false,
        subMenus: []
    },
    {
        name: "Examples",
        icon: "fa-solid fa-explosion",
        url: "/admin/profile",
        isTitle: false,
        subMenus: []
    }

]