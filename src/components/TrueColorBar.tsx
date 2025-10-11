import type React from 'react'

export const TrueColorBar: React.FC = () => {
  // Create a more authentic neofetch-style color bar with standard terminal colors
  const colors = [
    '#000000', // black
    '#800000', // dark red
    '#008000', // dark green
    '#808000', // dark yellow
    '#000080', // dark blue
    '#800080', // dark magenta
    '#008080', // dark cyan
    '#c0c0c0', // light gray
    '#808080', // dark gray
    '#ff0000', // red
    '#00ff00', // green
    '#ffff00', // yellow
    '#0000ff', // blue
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffffff', // white
  ]

  return (
    <div style={{ display: 'flex', height: '8px', width: '200px' }}>
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: '12.5px',
            height: '8px',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
