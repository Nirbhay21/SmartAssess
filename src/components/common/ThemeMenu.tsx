'use client';

import { Check, LaptopMinimal, LucideIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Keep same Theme type as switcher
type Theme = 'light' | 'dark' | 'system';

interface ThemeOption {
  name: Theme;
  icon: LucideIcon;
}

const themeOptions: ThemeOption[] = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: LaptopMinimal },
];

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();

  const current: ThemeOption = themeOptions.find((t) => t.name === theme) ?? themeOptions[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <current.icon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {themeOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.name}
            className="flex items-center justify-between"
            onClick={() => setTheme(opt.name)}
          >
            <div className="flex items-center space-x-2">
              <opt.icon className="h-4 w-4" />
              <span className="capitalize">{opt.name}</span>
            </div>
            {current.name === opt.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
