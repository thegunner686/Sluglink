export function rgb(r, g, b) {
    return (a) => {
        return a != undefined && a != null ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
    }
}

export function rgba(color) {
	let split = color.rgb.split(',');
  
 	let r = split[0].substr(5).trim(),
  		g = split[1].trim(),
        b = split[2].trim();
  
    return (a) => `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const Colors = {
    // Black & White
    Black: {
        hex: "#000000",
        rgb: rgb(0, 0, 0)(1),
    },
    White: {
        hex: "#FFFFFF",
        rgb: rgb(255, 255, 255)(1),
    },
    SteelBlue: {
        hex: '#1384fc',
        rgb: rgb(19, 132, 252)(1),
    },

    // Grey
    Grey1: {
        hex: "#2B2A2A",
        rgb: rgb(43, 42, 42)(1),
    },
    Grey2: {
        hex: "#3C3A3A",
        rgb: rgb(60, 58, 58)(1)
    },
    Grey3: {
        hex: "#676767",
        rgb: rgb(103, 103, 103)(1)
    },
    Grey4: {
        hex: "#969696",
        rgb: rgb(150, 150, 150)(1)
    },
    Grey5: {
        hex: "#C2C2C2",
        rgb: rgb(194, 194, 194)(1)
    },
    Grey6: {
        hex: "#F5F5F5",
        rgb: rgb(245, 245, 245)(1)
    },

    // Brown
    Brown1: {
        hex: "#343126",
        rgb: rgb(52, 49, 38)(1)
    },
    Brown2: {
        hex: "#524F43",
        rgb: rgb(82, 79, 67)(1)
    },
    Brown3: {
        hex: "#A7A18E",
        rgb: rgb(167, 161, 142)(1)
    },
    Brown4: {
        hex: "#CCC8B6",
        rgb: rgb(204, 200, 182)(1)
    },
    Brown5: {
        hex: "#F3F0E6",
        rgb: rgb(243, 240, 230)(1)
    },
    Brown6: {
        hex: "#FBFAF6",
        rgb: rgb(251, 250, 246)(1)
    },

    // Blue
    Blue1: {
        hex: "#00213C",
        rgb: rgb(0, 33, 60)(1)
    },
    Blue2: {
        hex: "#003560",
        rgb: rgb(0, 53, 96)(1)
    },
    Blue3: {
        hex: "#00467F",
        rgb: rgb(0, 70, 127)(1)
    },
    Blue4: {
        hex: "#19639E",
        rgb: rgb(25, 99, 158)(1)
    },
    Blue5: {
        hex: "#63A3D7",
        rgb: rgb(99, 163, 215)(1)
    },
    Blue6: {
        hex: "#BADEFB",
        rgb: rgb(186, 222, 251)(1)
    },

    // Yellow
    Yellow1: {
        hex: "#D1A700",
        rgb: rgb(209, 167, 0)(1)
    },
    Yellow2: {
        hex: "#FFCE0A",
        rgb: rgb(255, 206, 10)(1)
    },
    Yellow3: {
        hex: "#FFDE58",
        rgb: rgb(255, 222, 88)(1)
    },
    Yellow4: {
        hex: "#FFE990",
        rgb: rgb(255, 233, 144)(1)
    },
    Yellow5: {
        hex: "#FFF3C2",
        rgb: rgb(255, 243, 194)(1)
    },
    Yellow6: {
        hex: "#FFFBEC",
        rgb: rgb(255, 251, 236)(1)
    },

    // Green
    Green1: {
        hex: "#005F16",
        rgb: rgb(0, 95, 22)(1)
    },
    Green2: {
        hex: "#068D25",
        rgb: rgb(6, 141, 37)(1)
    },
    Green3: {
        hex: "#3BD15E",
        rgb: rgb(59, 209, 94)(1)
    },
    Green4: {
        hex: "#70F590",
        rgb: rgb(112, 245, 144)(1)
    },
    Green5: {
        hex: "#AAFFBE",
        rgb: rgb(170, 255, 190)(1)
    },
    Green6: {
        hex: "#DCFFE4",
        rgb: rgb(220, 255, 228)(1)
    },

    // Red
    Red1: {
        hex: "#801204",
        rgb: rgb(128, 18, 4)(1)
    },
    Red2: {
        hex: "#B92916",
        rgb: rgb(185, 41, 22)(1)
    },
    Red3: {
        hex: "#ED4E39",
        rgb: rgb(237, 78, 57)(1)
    },
    Red4: {
        hex: "#F97B6B",
        rgb: rgb(249, 123, 107)(1)
    },
    Red5: {
        hex: "#FFC0B8",
        rgb: rgb(255, 192, 184)(1)
    },
    Red6: {
        hex: "#FFEBE9",
        rgb: rgb(255, 235, 233)(1)
    },

    Random: () => {
        let r = Math.floor(Math.random() * 256),
            g = Math.floor(Math.random() * 256),
            b = Math.floor(Math.random() * 256);
        return {
            rgb: rgb(r, g, b)(1)
        }
    }
};
