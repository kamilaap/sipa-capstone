import React, { useState, useEffect, useRef } from 'react';

// Type definitions untuk posisi dan trail
interface PosisiKursor {
  x: number;
  y: number;
}

interface TitikEkor {
  x: number;
  y: number;
  opacity: number;
}

// Komponen kursor kustom 
const AnimatedCursor: React.FC = () => {
  // State untuk mencatat posisi mouse
  const [posisi, setPosisi] = useState<PosisiKursor>({ x: 0, y: 0 });
  const [posisiLuar, setPosisiLuar] = useState<PosisiKursor>({
    x: 0,
    y: 0,
  });
  const [titikEkor, setTitikEkor] = useState<TitikEkor[]>([]);
  const [terlihat, setTerlihat] = useState(false);
  const [diatasButton, setDiatasButton] = useState(false);
  const [diklik, setDiklik] = useState(false);
  const animFrameRef = useRef<number>(0);

  // Konfigurasi kursor - udah disesuaikan kok
  const pengaturan = {
    kecepatanIkutLuar: 0.4, // Cepat lambatnya lingkaran luar (0-1)
    kecepatanEkor: 0.25, // Kecepatan titik-titik ekor
    panjangEkor: 5, // Berapa banyak titik ekor
    kecepatanPudar: 0.92, // Seberapa cepat ekornya menghilang (0-1)
  };

  // Effect untuk mendeteksi gerakan mouse dan interaksi
  useEffect(() => {
    // Handler untuk update posisi
    const updatePosisi = (e: MouseEvent) => {
      setPosisi({ x: e.clientX, y: e.clientY });
    };

    // Handler untuk menampilkan/menyembunyikan kursor
    const handleMouseMasuk = () => setTerlihat(true);
    const handleMouseKeluar = () => setTerlihat(false);

    // Deteksi ketika kursor di atas elemen yang bisa diinteraksi
    const handleMouseDiatasInteraktif = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Cek apakah elemen target adalah button, link, input, dsb
      const bisaDiklik =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select';

      // Update state berdasarkan hasil cek
      setDiatasButton(!!bisaDiklik);
    };

    // Handler untuk klik mouse
    const handleMouseDown = () => setDiklik(true);
    const handleMouseUp = () => setDiklik(false);

    // Pasang semua event listener
    window.addEventListener('mousemove', updatePosisi);
    window.addEventListener('mousemove', handleMouseDiatasInteraktif);
    document.addEventListener('mouseenter', handleMouseMasuk);
    document.addEventListener('mouseleave', handleMouseKeluar);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listener saat component unmount
    return () => {
      window.removeEventListener('mousemove', updatePosisi);
      window.removeEventListener('mousemove', handleMouseDiatasInteraktif);
      document.removeEventListener('mouseenter', handleMouseMasuk);
      document.removeEventListener('mouseleave', handleMouseKeluar);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Loop animasi utama - bagian ini paling seru karena bikin animasi jadi smooth
  useEffect(() => {
    const animasi = () => {
      // Update posisi lingkaran luar dengan efek keterlambatan
      setPosisiLuar((posisiSekarang) => ({
        x:
          posisiSekarang.x +
          (posisi.x - posisiSekarang.x) * pengaturan.kecepatanIkutLuar,
        y:
          posisiSekarang.y +
          (posisi.y - posisiSekarang.y) * pengaturan.kecepatanIkutLuar,
      }));

      // Update titik-titik ekor kursor
      setTitikEkor((titikSekarang) => {
        // Tambah titik baru di depan
        const titikBaru = [
          {
            x: posisi.x,
            y: posisi.y,
            opacity: 0.6,
          },
          ...titikSekarang,
        ];

        // Pudarkan titik yang sudah ada
        const titikDiupdate = titikBaru.map((titik, index) => ({
          ...titik,
          opacity:
            index === 0 ? 0.6 : titik.opacity * pengaturan.kecepatanPudar,
        }));

        // Batasi jumlah titik sesuai pengaturan
        return titikDiupdate.slice(0, pengaturan.panjangEkor);
      });

      // Lanjutkan loop animasi
      animFrameRef.current = requestAnimationFrame(animasi);
    };

    // Mulai loop animasi
    animFrameRef.current = requestAnimationFrame(animasi);

    // Cleanup saat component unmount atau dependencies berubah
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    posisi,
    pengaturan.kecepatanIkutLuar,
    pengaturan.kecepatanPudar,
    pengaturan.panjangEkor,
  ]);

  return (
    <>
      {/* Container kursor - ini penting biar tidak menghalangi interaksi */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Ini penting banget agar kursor custom tidak menghalangi klik
          zIndex: 9999,
        }}
      >
        {/* Titik tengah kursor - ini yang paling depan */}
        <div
          className="fixed w-3 h-3 bg-blue-500 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
          style={{
            left: `${posisi.x}px`,
            top: `${posisi.y}px`,
            transform: `translate(-50%, -50%) scale(${diklik ? '0.5' : '1'})`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)', // Efek glow biru
            transition: 'transform 0.15s ease-out',
            opacity: terlihat ? 1 : 0,
          }}
        />

        {/* Titik-titik ekor - bikin efek trail yang keren */}
        {titikEkor.map((titik, index) => (
          <div
            key={index}
            className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
            style={{
              left: `${titik.x}px`,
              top: `${titik.y}px`,
              opacity: titik.opacity,
              transform: 'translate(-50%, -50%) scale(0.8)',
            }}
          />
        ))}

        {/* Lingkaran luar - berubah ukuran saat hover di elemen */}
        <div
          className="fixed border-2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${posisiLuar.x}px`,
            top: `${posisiLuar.y}px`,
            borderColor: diatasButton
              ? 'rgba(59, 130, 246, 0.8)' // Warna biru lebih terang saat di atas button
              : 'rgba(59, 130, 246, 0.5)',
            borderRadius: '50%',
            width: diatasButton ? '2rem' : '1.5rem', // Membesar saat di atas button
            height: diatasButton ? '2rem' : '1.5rem',
            backgroundColor: diatasButton
              ? 'rgba(59, 130, 246, 0.1)' // Background biru tipis saat di atas button
              : 'transparent',
            transform: `translate(-50%, -50%) scale(${diklik ? '0.8' : '1'})`, // Mengecil saat diklik
            transition:
              'width 0.2s ease, height 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
            opacity: terlihat ? 1 : 0,
          }}
        />
      </div>
    </>
  );
};

export default AnimatedCursor;
