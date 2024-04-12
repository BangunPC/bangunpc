import { component$ } from '@builder.io/qwik';
import {
  casingKeys,
  cpuKeys,
  gpuKeys,
  memoryKeys,
  motherboardKeys,
  psuKeys,
  storageKeys,
} from '~/lib/katalog_types';

type ComponentFallbackProps = {
  headers: string[];
  kategori: string;
  component: any;
  isMobile: boolean;
  onClick$?: any;
};

export const ComponentFallback = component$<ComponentFallbackProps>(
  ({ headers, kategori, component, isMobile, onClick$ }) => {
    let keys: any[] = [];
    switch (kategori) {
      // case "headphone":
      // case "keyboard":
      // case "mouse":
      // case "speaker":
      // case "webcam":
      // case "printer":
      // case "monitor":
      // case "os":
      // case "soundcard":
      // case "wirednetwork":
      // case "wirelessnetwork":
      // case "casefan":
      // case "externaldrive":
      case 'motherboard':
        keys = motherboardKeys;
        break;
      case 'cpu':
        keys = cpuKeys;
        break;
      case 'gpu':
        keys = gpuKeys;
        break;
      case 'memory':
        keys = memoryKeys;
        break;
      // case "cooler":
      case 'psu':
        keys = psuKeys;
        break;
      // case "cable":
      case 'storage':
        keys = storageKeys;
        break;
      case 'casing':
        keys = casingKeys;
        break;
      default:
        break;
    }

    if (isMobile)
      return (
        <>
          {keys.map((key, index) => (
            <div key={key} class="flex flex-col">
              <div class="text-sm mt-1 mb-2">{headers[index]}</div>
              <div class="font-semibold">{component[key] ?? '-'}</div>
            </div>
          ))}
        </>
      );

    return (
      <>
        {keys.map((key) => (
          <td key={key} onClick$={onClick$}>
            {component[key] ?? '-'}
          </td>
        ))}
      </>
    );
  }
);
