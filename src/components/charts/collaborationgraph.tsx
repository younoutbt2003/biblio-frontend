import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const data = {
  nodes: [
    { id: "Team Core", group: "core", size: 20 },
    { id: "Ahmed", group: "internal", size: 12 },
    { id: "Sarah", group: "internal", size: 14 },
    { id: "Karim", group: "internal", size: 10 },
    { id: "MIT", group: "external", size: 8 },
    { id: "Oxford", group: "external", size: 7 },
  ],
  links: [
    { source: "Team Core", target: "Ahmed" },
    { source: "Team Core", target: "Sarah" },
    { source: "Team Core", target: "Karim" },
    { source: "Ahmed", target: "MIT" },
    { source: "Sarah", target: "Oxford" },
  ],
};

export const CollaborationGraph: React.FC = () => {
  return (
    <div className="w-full h-[350px]">
      <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id as string;
          const size = (node.size as number) || 8;

          // cercle
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI, false);
          ctx.fillStyle =
            node.group === "core"
              ? "#2563EB"
              : node.group === "internal"
              ? "#3B82F6"
              : "#9CA3AF";
          ctx.fill();

          // texte
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "#111";
          ctx.fillText(label, node.x! + size + 2, node.y! + size / 2);
        }}

        linkColor={() => "#CBD5E1"}
        linkWidth={2}

        // interactions 🔥
        onNodeHover={(node) => {
          document.body.style.cursor = node ? "pointer" : "default";
        }}

        onNodeClick={(node) => {
          alert(`Clicked on ${node.id}`);
        }}
      />
    </div>
  );
};