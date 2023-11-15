"use client"
import React from "react";
import { Tabs, Tab, Link} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tabs
        key="underlined"
        color="default"
        variant="underlined"
        aria-label="Tabs variants"
      >
        <Tab key="photos" title="Inicio" href="/login"  onSelectionChange={ (key) => console.log(key)}/>
        <Tab key="music" title="Acerca de" />
        <Tab key="videos" title="Nosotros" />
      </Tabs>
    </div>
  );
}
