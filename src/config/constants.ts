export const MASTER_INFO = {
  name: "Dungeon Master",
  addres: "ул. Пушкина, д. 1488, Майами",
  phone: "+71234566778",
};

export const SERVICES = {
  brows: { name: "брови", duration: 60, price: 1500 },
  lashes: {
    name: "ресницы",
    "3D": {
      duration: 70,
      price: 1700,
    },
    "4D": {
      duration: 90,
      price: 2000,
    },
  },
};

export const WORKING_HOURS = {
  start: 10,
  end: 20,
};

export interface BusinessConfig {
  name: string;
  services: typeof SERVICES;
  adminId: number;
}
