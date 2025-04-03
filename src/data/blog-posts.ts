import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building a High-Performance Gaming PC in 2024',
    slug: 'building-high-performance-gaming-pc-2024',
    excerpt: 'Learn how to build a powerful gaming PC that can handle the latest titles with high frame rates and stunning graphics.',
    content: `
# Building a High-Performance Gaming PC in 2024

Building your own gaming PC can be both exciting and rewarding. In this comprehensive guide, we'll walk you through the process of selecting and assembling the perfect components for your gaming rig.

## Choosing the Right Components

### CPU Selection
The heart of your gaming PC, the CPU, needs to be powerful enough to handle modern games. We recommend either the Intel Core i7-14700K or AMD Ryzen 7 7800X3D for optimal performance.

### Graphics Card
For 1440p or 4K gaming, consider the NVIDIA RTX 4080 Super or AMD RX 7900 XTX. These cards offer excellent performance and ray-tracing capabilities.

### Memory and Storage
- 32GB DDR5 RAM (6000MHz or higher)
- 2TB NVMe SSD for fast loading times
- 4TB HDD for additional storage

## Assembly Process

### Step 1: Prepare Your Workspace
Find a clean, well-lit area with plenty of space. Gather all necessary tools and components.

### Step 2: Install the CPU
Carefully align the CPU with the socket and secure it in place. Apply thermal paste evenly.

### Step 3: Mount the Motherboard
Place the motherboard in the case, ensuring all standoffs are properly aligned.

## Performance Optimization

### BIOS Settings
Adjust your BIOS settings for optimal performance:
- Enable XMP for RAM
- Set power limits
- Configure fan curves

### Windows Optimization
- Install latest drivers
- Configure power settings
- Disable unnecessary background processes

## Conclusion
Building a gaming PC is a rewarding experience that gives you full control over your system's performance and upgradeability.
    `,
    coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60',
    },
    publishedAt: '2024-03-23',
    readTime: '8 min read',
    category: 'Hardware',
    tags: ['Gaming', 'PC Building', 'Hardware', 'Performance'],
  },
  {
    id: '2',
    title: 'Understanding Modern CPU Architectures',
    slug: 'understanding-modern-cpu-architectures',
    excerpt: 'A deep dive into how modern CPU architectures work and what makes them tick.',
    content: `
# Understanding Modern CPU Architectures

Modern CPUs are incredibly complex pieces of technology. Let's explore how they work and what makes them efficient. asdasd a asd asdas ad asd asd adssa dasd asd asd asd asd asd asd asdasdsad asdsaddasdsa 

## Basic CPU Components

### Control Unit
The control unit manages the execution of instructions and coordinates different parts of the CPU.

### Arithmetic Logic Unit (ALU)
The ALU performs mathematical and logical operations.

### Cache Memory
Modern CPUs feature multiple levels of cache:
- L1 Cache: Fastest but smallest
- L2 Cache: Medium speed and size
- L3 Cache: Largest but slowest

## Modern CPU Features

### Multi-Core Processing
Understanding how multiple cores work together:
- Symmetric multiprocessing
- Thread management
- Core communication

### Instruction Sets
- x86 and ARM architectures
- SIMD instructions
- Virtualization support

## Performance Considerations

### Clock Speed vs. IPC
- Understanding instructions per cycle
- The role of clock speed
- Thermal considerations

### Power Efficiency
- Dynamic frequency scaling
- Power management features
- Thermal throttling

## Future Trends
- Quantum computing
- Neuromorphic computing
- Advanced packaging technologies
    `,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
    },
    publishedAt: '2024-03-22',
    readTime: '10 min read',
    category: 'Technology',
    tags: ['CPU', 'Architecture', 'Hardware', 'Technology'],
  },
]; 