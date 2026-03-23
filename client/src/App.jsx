import { useState, useEffect } from "react";
import { ReactFlow, useNodesState, useEdgesState, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("Waiting for AI...");

  // 1. Use React Flow's built-in state managers
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 50, y: 100 },
      className: "nodrag", // Prevents the node from moving when you try to type!
      data: {
        label: (
          <textarea
            placeholder="Type your prompt..."
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "100%", height: "50px", marginTop: "10px" }}
          />
        ),
      },
    },
    {
      id: "2",
      position: { x: 400, y: 100 },
      data: {
        label: <div>{result}</div>,
      },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2" },
  ]);

  // 2. Update the second node dynamically whenever 'result' changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "2") {
          return { ...node, data: { ...node.data, label: <div>{result}</div> } };
        }
        return node;
      })
    );
  }, [result, setNodes]);

  const runFlow = async () => {
    try {
      setResult("Loading..."); // Gives the user visual feedback
      const res = await axios.post("http://localhost:5000/api/ask-ai", { prompt });
      setResult(res.data.result);
    } catch (error) {
      console.error(error);
      setResult("Error fetching AI response.");
    }
  };

  const saveFlow = async () => {
  await axios.post(
    "http://localhost:5000/api/save",
    {
      prompt,
      response: result,
    }
  );

  alert("Saved to DB");
};

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Floating button at the top left */}
      <div style={{ position: "absolute", zIndex: 10, padding: "15px" }}>
        <button onClick={runFlow} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Run Flow
        </button>
        <button onClick={saveFlow} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Save
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} // Allows nodes to be dragged
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#ccc" gap={16} />
        <Controls />
      </ReactFlow>

{/* Floating Save Button */}
      <div style={{ position: "absolute", zIndex: 20, padding: "15px" }}>
        <button onClick={saveFlow} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Save
        </button>
      </div>
    </div>
  );
}