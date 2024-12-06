"use client";

import { ComponentCategory, ComponentDetail, ComponentDetailMap } from "./db";

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
  availableMemorySlot?: number;
  availableNvmeSlot?: number;
  availableSataSlot?: number;
  maxMemorySizeGb?: number;
  maxTotalPowerWatt?: number;
  selectedMemoryAmount?: number;
  selectedMemorySizeGb?: number;
  selectedNvmeAmount?: number;
  selectedSataAmount?: number;
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
  static async addComponent(component: ComponentStorageType) {
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionKey: component.storageId, value: component }),
    });
    // setInput('');
    // // Refresh data
    // fetch('/api/data')
    //   .then(response => response.json())
    //   .then(data => setData(data));
    const components = this.getComponents();
    components.push(component);
    LocalStorageHelper.setItem("components", components);
  }

  static getComponents(): ComponentStorageType[] {
    return LocalStorageHelper.getItem("components") ?? [];
  }

  static async getComponentsByCategory(category: ComponentCategory) {
    // const components: ComponentStorageType[] =
    //   LocalStorageHelper.getItem("components") ?? [];

    const components = await fetch('/api/data')
      .then(response => response.json())
      .then(data => data.value);
    
    console.log(components);
    
      
    return components.filter((component: any) => component.category === category);
  }
  
  static getComponentDetail = async <K extends ComponentCategory>(category: K): Promise<ComponentDetailMap[K] | undefined> => {
    const components = await this.getComponentsByCategory(category);
    
    switch (category) {
      case ComponentCategory.Memory:
      case ComponentCategory.Storage:
        // These categories return arrays
        return components?.map((component: any) => component.detail) as ComponentDetailMap[K];
      
      default:
        // Other categories return a single detail
        return components?.[0]?.detail as ComponentDetailMap[K];
    }
  };

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

  static initializeData(): void {
    if(!this.getSimulationData()) {
      this.upsertSimulationData({
        availableMemorySlot: 2,
        availableNvmeSlot: 1,
        availableSataSlot: 1,
      })
    }
  }

  static clear() {
    LocalStorageHelper.removeItem("simulation");
  }
}

export { ComponentStorageHelper as ComponentStorage, SimulationStorageHelper as SimulationStorage };
