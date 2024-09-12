"use client";

import { ComponentCategory, ComponentDetail } from "./db";

class LocalStorageHelper {
  static setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export type SimulationStorageData = {
  selectedMemoryAmount?: number;
  selectedMemorySizeGb?: number;
  selectedStorageAmount?: number;
  currentTotalPowerWatt?: number;
};

export type ComponentStorageType = {
  storageId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: ComponentCategory;
  slug: string;
  detail: ComponentDetail;
};

export class ComponentStorageHelper {
  static addComponent(component: ComponentStorageType) {
    const components = this.getComponents();
    components.push(component);
    LocalStorageHelper.setItem("components", components);
  }

  static getComponents(): ComponentStorageType[] {
    return LocalStorageHelper.getItem("components") ?? [];
  }

  static getComponentsByCategory(category: ComponentCategory) {
    const components: ComponentStorageType[] =
      LocalStorageHelper.getItem("components") ?? [];
    return components.filter((component) => component.category === category);
  }

  static removeComponentById(storageId: string) {
    let components: ComponentStorageType[] =
      LocalStorageHelper.getItem("components") ?? [];
    components = components.filter(
      (component) => component.storageId !== storageId
    );
    LocalStorageHelper.setItem("components", components);
  }

  static updateComponent(
    storageId: string,
    updatedComponent: ComponentStorageType
  ) {
    const components: ComponentStorageType[] =
      LocalStorageHelper.getItem("components") ?? [];
    const index = components.findIndex(
      (component) => component.storageId === storageId
    );
    if (index !== -1) {
      components[index] = { ...components[index], ...updatedComponent };
      LocalStorageHelper.setItem("components", components);
    }
  }

  static totalPrice() {
    const components = this.getComponents();
    return components.reduce(
      (total, component) => total + component.price * component.quantity,
      0
    );
  }

  static clear() {
    LocalStorageHelper.removeItem("components");
  }
}

export class SimulationStorageHelper {
  static upsertSimulationData(partialData: Partial<SimulationStorageData>) {
    const existingData = this.getSimulationData() ?? {};
    const updatedData = { ...existingData, ...partialData };
    LocalStorageHelper.setItem("simulation", updatedData);
  }

  static getSimulationData(): SimulationStorageData | null {
    return LocalStorageHelper.getItem("simulation");
  }

  static clear() {
    LocalStorageHelper.removeItem("simulation");
  }
}

export { ComponentStorageHelper as ComponentStorage, SimulationStorageHelper as SimulationStorage };
