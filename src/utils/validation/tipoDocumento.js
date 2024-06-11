export const validateDocument = {
    1: {
      length: 8,
      minLength: 8,
      lengthMessage: "Este campo debe tener 8 caracteres",
      pattern: /^[0-9]*$/,
      message: "Este campo debe contener solo números",
    },
    2: {
      length: 12,
      minLength: 0,
      lengthMessage: "Este campo debe tener maximo 12 caracteres",
      pattern: /^[A-Za-z0-9]*$/,
      message: "Este campo debe contener solo caracteres alfanuméricos",
    },
    3: {
      length: 12,
      lengthMessage: "Este campo debe tener maximo 12 caracteres",
      pattern: /^[A-Za-z0-9]*$/,
      message: "Este campo debe contener solo caracteres alfanuméricos",
    },
    4: {
      length: 11,
      minLength: 11,
      pattern: /^[0-9]*$/,
      lengthMessage: "Este campo debe tener 11 caracteres",
      message: "Este campo debe contener solo números",
    },
  };


export function capitalizeWords(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}
