"use client";

import { ComponentCategory } from "./db";

class LocalStorageHelper {
    static setItem<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

export type ComponentStorageType = {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    category: ComponentCategory
    slug: string
}

export class ComponentStorageHelper {
    static addComponent(component: ComponentStorageType) {
        let components = this.getComponents();
        // const index = components.findIndex(c => c.id === component.id);
        // if (index !== -1) {
        //     components[index].quantity += component.quantity;
        // } else {
        components.push(component);
        // }
        LocalStorageHelper.setItem('components', components);
    }

    static getComponents(): ComponentStorageType[] {
        return LocalStorageHelper.getItem('components') || [];
    }

    static getComponentsByCategory(category: ComponentCategory) {
        let components: ComponentStorageType[] = LocalStorageHelper.getItem('components') || [];
        return components.filter(component => component.category === category);
    }

    static removeComponentById(id: string) {
        let components: ComponentStorageType[] = LocalStorageHelper.getItem('components') || [];
        components = components.filter(component => component.id !== id);
        LocalStorageHelper.setItem('components', components);
    }

    static updateComponent(id: string, updatedComponent: ComponentStorageType) {
        let components: ComponentStorageType[] = LocalStorageHelper.getItem('components') || [];
        const index = components.findIndex(component => component.id === id);
        if (index !== -1) {
            components[index] = { ...components[index], ...updatedComponent };
            LocalStorageHelper.setItem('components', components);
        }
    }

    /**
     * Calculates the total price of all components in the cart.
     *
     * @return {number} The total price of all components.
     */
    static totalPrice() {
        let components = this.getComponents();
        return components.reduce((total, component) => total + (component.price * component.quantity), 0);
    }

    static clear() {
        LocalStorageHelper.removeItem('components');
    }
}

export { LocalStorageHelper, ComponentStorageHelper as ComponentStorage };