import { useEffect, useState } from "react";
import {
  AreaChart, Area,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import "./App.css";

const r = (a, b) => Math.floor(Math.random() * (b - a) + a);

export default function App() {
  const [dark, setDark] = useState(false);
  const [chatMin, setChatMin] = useState(false);

  const [system, setSystem] = useState([]);
  const [network, setNetwork] = useState([]);
  const [apps, setApps] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const pieData = [
    { name: "Google Chrome", value: 45, color: "#7f8c8d" },
    { name: "VS Code", value: 30, color: "#95a5a6" },
    { name: "Servicios Linux", value: 25, color: "#bdc3c7" }
  ];

  useEffect(() => {
    const s = setInterval(() => {
      setSystem(v => [...v.slice(-6), {
        t: new Date().toLocaleTimeString(),
        cpu: r(35, 95),
        ram: r(25, 85)
      }]);
    }, 2000);

    const n = setInterval(() => {
      setNetwork(v => [...v.slice(-6), {
        t: new Date().toLocaleTimeString(),
        in: r(15, 90),
        out: r(10, 70)
      }]);
    }, 2500);

    const a = setInterval(() => {
      setApps([
        { name: "Node.js", v: r(15, 55) },
        { name: "MySQL", v: r(20, 50) },
        { name: "Apache", v: r(10, 40) },
        { name: "Docker", v: r(10, 45) },
        { name: "Redis", v: r(5, 30) },
        { name: "Nginx", v: r(8, 35) }
      ]);
    }, 3000);

    const al = setInterval(() => {
      setAlerts(v => [{
        level: ["low", "medium", "high"][r(0, 3)],
        msg: "Comportamiento anómalo detectado",
        time: new Date().toLocaleTimeString()
      }, ...v.slice(0, 4)]);
    }, 4000);

    return () => {
      clearInterval(s);
      clearInterval(n);
      clearInterval(a);
      clearInterval(al);
    };
  }, []);

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <header className="topbar">
        <h2>Monitoreo Sistemas Operativos</h2>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </header>

      <div className="grid">
        <div className="card">
          <h3>Estado del sistema</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={system}>
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Area dataKey="cpu" stroke="#8e44ad" fill="#d2b4de" />
              <Area dataKey="ram" stroke="#5b2c6f" fill="#c39bd3" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="analysis">
            Consumo dinámico de CPU y memoria.
          </div>
        </div>

        <div className="card">
          <h3>Tráfico de red</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={network}>
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Line dataKey="in" stroke="#7d3c98" strokeWidth={2} />
              <Line dataKey="out" stroke="#a569bd" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="analysis">
            Picos inusuales pueden indicar ataques o escaneos.
          </div>
        </div>

        <div className="card">
          <h3>Aplicaciones críticas</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={apps}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="v" fill="#9b59b6" />
            </BarChart>
          </ResponsiveContainer>

          <h4 className="sub">Otras aplicaciones</h4>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                label
              >
                {pieData.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ul className="legend">
            {pieData.map((p, i) => (
              <li key={i}>
                <span className="dot" style={{ background: p.color }}></span>
                {p.name} ({p.value}%)
              </li>
            ))}
          </ul>
        </div>

        <div className="card alerts">
          <h3>Alertas activas</h3>
          {alerts.map((a, i) => (
            <div key={i} className={`alert ${a.level}`}>
              <strong>{a.level.toUpperCase()}</strong>
              <span>{a.time}</span>
              <p>{a.msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHATBOT */}
      <div className={`chatbot ${chatMin ? "min" : ""}`}>
        <div className="chat-header">
          <span>Asistente del sistema</span>
          <button className="min-btn" onClick={() => setChatMin(!chatMin)}>
            {chatMin ? "▲" : "—"}
          </button>
        </div>

        {!chatMin && (
          <>
            <div className="chat-body">
              <div className="msg bot">Monitoreo activo.</div>
              <div className="msg user">Estado actual</div>
              <div className="msg bot">No se detectan incidentes críticos.</div>
            </div>
            <input className="chat-input" placeholder="Consultar estado" />
          </>
        )}
      </div>
    </div>
  );
}
