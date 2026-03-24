import { useState, useEffect } from "react";
import { ReactFlow, useNodesState, useEdgesState, Background, Controls } from "@xyflow/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "@xyflow/react/dist/style.css";
import 'react-toastify/dist/ReactToastify.css'; 
import "./App.css"; 

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("Waiting for prompt...");

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 50, y: 150 }, 
      className: "nodrag",
      data: {
        label: (
          <textarea
            placeholder="Type your prompt..."
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", height: "50px", marginTop: "10px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        ),
      },
    },
    {
      id: "2",
      position: { x: 450, y: 150 },
      data: {
        label: <div style={{ padding: "8px", maxWidth: "300px", whiteSpace: "pre-wrap" }}>{result}</div>,
      },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2", animated: true, type: "smoothstep" },
  ]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "2") {
          return { ...node, data: { ...node.data, label: <div style={{ padding: "8px", maxWidth: "300px", whiteSpace: "pre-wrap" }}>{result}</div> } };
        }
        return node;
      })
    );
  }, [result, setNodes]);

  const runFlow = async () => {
    if (!prompt.trim()) {
      toast.warn("Please enter a prompt first.");
      return;
    }
    const toastId = toast.loading("Asking AI...");
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ask-ai`, { prompt });
      setResult(res.data.result);
      
      toast.update(toastId, {
        render: "AI responded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

    } catch (error) {
      console.error(error);
      setResult("Error fetching AI response.");
      toast.update(toastId, {
        render: "Failed to connect to AI.",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
    }
  };

  const saveFlow = async () => {
    if (!prompt.trim() || result === "Waiting for prompt..." || result === "Error fetching AI response.") {
      toast.warn("Run the flow first to generate a response before saving.");
      return;
    }

    const toastId = toast.loading("Saving to Database...");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/save`, { prompt, response: result });
      
      toast.update(toastId, {
        render: "Saved in MongoDB.",
        type: "success",
        isLoading: false,
        autoClose: 2500
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Failed to save to database.",
        type: "error",
        isLoading: false,
        autoClose: 2500
      });
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", backgroundColor: "whitesmoke" }}>
      <ToastContainer position="top-right" theme="colored" />

      {/* Run Flow Button */}
      <div className="top-panel">
        <button onClick={runFlow} className="modern-btn run-btn">
          Run Flow
        </button>
      </div>

      {/* The React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="gray" gap={16} />
        <Controls />
      </ReactFlow>

      {/* MongoDB Save Button */}
      <div className="bottom-panel">
        <button onClick={saveFlow} className="modern-btn save-btn">
          Save to DB
        </button>
      </div>
    </div>
  );
}