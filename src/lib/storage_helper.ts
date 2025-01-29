import { ComponentCategoryEnum, ComponentDetail, ComponentDetailMap } from "@/lib/db";

// Memory storage for server-side
const serverStorage = new Map<string, string>();

class StorageHelper {
  static setItem<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      serverStorage.set(key, JSON.stringify(value));
    }
  }

  static getItem<T>(key: string): T | null {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } else {
      const item = serverStorage.get(key);
      return item ? (JSON.parse(item) as T) : null;
    }
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      serverStorage.delete(key);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    } else {
      serverStorage.clear();
    }
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
  category: ComponentCategoryEnum;
  slug: string;
  detail: ComponentDetail;
};

export class ComponentStorageHelper {
  static async addComponent(component: ComponentStorageType) {
    const components = this.getComponents();
    components.push(component);
    StorageHelper.setItem("components", components);
  }

  static getComponents(): ComponentStorageType[] {
    return StorageHelper.getItem("components") ?? [];
  }

  static async getComponentsByCategory(category: ComponentCategoryEnum) {
    const components: ComponentStorageType[] = 
      StorageHelper.getItem("components") ?? [];  
      
    return components.filter((component) => component.category === category);
  }
  
  static getComponentDetail = async <K extends ComponentCategoryEnum>(category: K): Promise<ComponentDetailMap[K] | undefined> => {
    const components = await this.getComponentsByCategory(category);
    
    switch (category) {
      case ComponentCategoryEnum.Memory:
      case ComponentCategoryEnum.Storage:
        return components?.map((component) => component.detail) as ComponentDetailMap[K];
      
      default:
        return components?.[0]?.detail as ComponentDetailMap[K];
    }
  };

  static removeComponentById(storageId: string) {
    let components: ComponentStorageType[] =
      StorageHelper.getItem("components") ?? [];
    components = components.filter(
      (component) => component.storageId !== storageId
    );
    StorageHelper.setItem("components", components);
  }

  static updateComponent(
    storageId: string,
    updatedComponent: ComponentStorageType
  ) {
    const components: ComponentStorageType[] =
      StorageHelper.getItem("components") ?? [];
    const index = components.findIndex(
      (component) => component.storageId === storageId
    );
    if (index !== -1) {
      components[index] = { ...components[index], ...updatedComponent };
      StorageHelper.setItem("components", components);
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
    StorageHelper.removeItem("components");
  }
}

export class SimulationStorageHelper {
  static upsertSimulationData(partialData: Partial<SimulationStorageData>) {
    const existingData = this.getSimulationData() ?? {};
    const updatedData = { ...existingData, ...partialData };
    StorageHelper.setItem("simulation", updatedData);
  }

  static getSimulationData(): SimulationStorageData | null {
    return StorageHelper.getItem("simulation");
  }

  static initializeData(): void {
    if(!this.getSimulationData()) {
      this.upsertSimulationData({
        availableMemorySlot: 2,
        availableNvmeSlot: 1,
        availableSataSlot: 1,
      });
    }
  }

  static clear() {
    StorageHelper.removeItem("simulation");
  }
}

export { ComponentStorageHelper as ComponentStorage, SimulationStorageHelper as SimulationStorage };