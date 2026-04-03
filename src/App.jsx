import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [outputJson, setOutputJson] = useState(null)
  const [history, setHistory] = useState([])

  // 10 Students, 4 Aspects
  const students = Array.from({ length: 10 }, (_, i) => i + 1)
  const aspects = Array.from({ length: 4 }, (_, i) => i + 1)

  // Load History on Mount
  useEffect(() => {
    const saved = localStorage.getItem('penilaian_history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const result = {}
    
    aspects.forEach(a => {
      result[`aspek_penilaian_${a}`] = {}
    })

    for (let [key, value] of formData.entries()) {
      const parts = key.split('_')
      if (parts.length === 4) {
        const aspectNum = parts[1]
        const mahasiswaNum = parts[3]
        result[`aspek_penilaian_${aspectNum}`][`mahasiswa_${mahasiswaNum}`] = parseInt(value, 10)
      }
    }

    setOutputJson(result)

    // C - CREATE
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
      data: result
    }
    
    const updatedHistory = [newRecord, ...history]
    setHistory(updatedHistory)
    localStorage.setItem('penilaian_history', JSON.stringify(updatedHistory))
    
    alert('Penilaian berhasil disimpan!')
    e.target.reset() 
  }

  // D - DELETE
  const handleDelete = (id) => {
    if(window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const updatedHistory = history.filter(item => item.id !== id)
      setHistory(updatedHistory)
      localStorage.setItem('penilaian_history', JSON.stringify(updatedHistory))
      
      // Clean up preview
      if(outputJson && updatedHistory.length === 0) setOutputJson(null)
    }
  }

  // ANALYTICS & EXPORT
  const handleDownloadFile = () => {
    if (!outputJson) return;
    const blob = new Blob([JSON.stringify(outputJson, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `penilaian_kelas_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getAnalytics = () => {
    if(!outputJson) return null;
    const averages = {};
    Object.keys(outputJson).forEach(aspek => {
      const scores = Object.values(outputJson[aspek]);
      const total = scores.reduce((sum, score) => sum + score, 0);
      averages[aspek] = (total / scores.length).toFixed(2);
    })
    return averages;
  }

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title">Aplikasi Penilaian Mahasiswa (CRUD Edition)</h1>
        <p className="subtitle">Sistem Input Akademik Berbasis Uncontrolled Render dengan Analytics</p>
      </div>

      <div className="card">
         <div className="section-head form-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <h2 className="section-title">Form Input Nilai Baru</h2>
          </div>
        <form onSubmit={handleSubmit} className="grading-form" autoComplete="off">
          <div className="table-wrapper">
            <table className="grading-table">
              <thead>
                <tr>
                  <th></th>
                  {aspects.map(a => (
                    <th key={a}>Aspek<br/>penilaian {a}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s}>
                    <td className="student-name">
                      <div className="student-info">
                        <div className="avatar-placeholder">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <span>Mahasiswa {s}</span>
                      </div>
                    </td>
                    {aspects.map(a => (
                      <td key={`aspek_${a}_m_${s}`}>
                        <div className="select-wrapper">
                          <select 
                            name={`aspek_${a}_mahasiswa_${s}`} 
                            defaultValue="1" 
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-btn form-submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: 18, marginRight: 8, verticalAlign: 'middle'}}>
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Simpan Penilaian
            </button>
          </div>
        </form>
      </div>

      {/* R - READ: Riwayat Penilaian */}
      {history.length > 0 && (
         <div className="card result-card">
            <div className="section-head">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <h2 className="section-title">Riwayat Input Penilaian (Database Dummy)</h2>
            </div>
            
            <div className="history-list">
              {history.map(record => (
                <div key={record.id} className="history-item">
                  <div className="history-header">
                    <div>
                      <strong>ID:</strong> {record.id}<br/>
                      <small style={{color: '#64748b'}}>{record.timestamp}</small>
                    </div>
                    <div className="history-actions">
                      <button 
                        className="btn-view" 
                        onClick={() => setOutputJson(record.data)}
                      >Buka Analytics</button>
                      <button 
                         className="btn-delete"
                         onClick={() => handleDelete(record.id)}
                      >Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {outputJson && (
              <div className="json-preview" style={{marginTop: 30}}>
                <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                   <h3 style={{margin:0}}>Workspace Analisis</h3>
                   <button onClick={handleDownloadFile} className="btn-view" style={{backgroundColor: '#10b981', color: 'white', borderColor: '#059669'}}>
                      Unduh JSON File .json
                   </button>
                </div>
                
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px'}}>
                   {Object.entries(getAnalytics()).map(([aspek, avg]) => (
                      <div key={aspek} style={{background:'#f8fafc', padding:15, borderRadius:8, border:'1px solid #e2e8f0'}}>
                         <div style={{fontSize: 12, color: '#64748b', textTransform:'uppercase', fontWeight: 600}}>Rata-Rata {aspek.replace('_', ' ')}</div>
                         <div style={{fontSize: 24, fontWeight: 700, color: '#0f172a'}}>{avg} / 10</div>
                      </div>
                   ))}
                </div>

                <details style={{background:'#fcfcfc', border: '1px solid #e2e8f0', borderRadius: 8}}>
                  <summary style={{padding: 15, cursor:'pointer', fontWeight: 500, userSelect: 'none'}}>Lihat Data Mentah (Output JSON Target)</summary>
                  <pre className="output-pre" style={{borderRadius: '0 0 8px 8px', borderTop: '1px solid #e2e8f0'}}>{JSON.stringify(outputJson, null, 2)}</pre>
                </details>
              </div>
            )}
         </div>
      )}

      <div className="card docs-card">
         <div className="section-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <h2 className="section-title">Dokumentasi Sistem & UI</h2>
          </div>
          <div className="docs-content">
            <p>Aplikasi ini didesain menggunakan metode <strong>Uncontrolled Components</strong> dalam library React dengan kapabilitas <strong>CRUD Storage Lokal</strong> dan <strong>Sistem Analitik Singkat</strong>.</p>
            <h3>Analisa Pemecahan Masalah (UI/UX & Bisnis)</h3>
            <ul>
              <li><strong>Eksport Data:</strong> Dapat mendownload hasil akhir dalam bentuk flat file `.json` untuk di feed ke sistem kampus lain!</li>
              <li><strong>Mini Analytics:</strong> Otomatis mengakumulasikan nilai rata-rata dari ke-empat aspek sehingga membantu Dosen menyimpulkan pemahaman kelas secara real-time.</li>
              <li><strong>Zero Re-Rendering:</strong> 40 komponen input berjalan sehalus mungkin berkat absennya sinkronisasi UI React selama user melakukan *typing* dropdown.</li>
            </ul>
            <p>Silakan buka folder <strong><code>docs/SYSTEM_DESIGN.md</code></strong> untuk mempelajari lengkap Usecase, Sequence Diagram, dan API Swagger Definitions.</p>
          </div>
      </div>
    </div>
  )
}

export default App
