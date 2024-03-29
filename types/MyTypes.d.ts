export interface Persona {
    id: string
    nombres: string
    apellidos: string
    tipoDocumento: string
    numeroIdentificacion: string
    fechaNacimiento: string
    genero: string
    correoElectronico: string
    celular: string
    departamento: string
    ciudad: string
    foto: string
    password: string
    poblacionEspecial: string
    rolId: string
}

interface UsuarioInvitado {
    id: string
    nombres: string
    apellidos: string
    tipoDocumento: string
    numeroIdentificacion: string
    correoElectronico: string
    celular: string
    departamento: string
    ciudad: string
    cursoComplementarioId: string
}

interface Instructor {
    nombres: string
    apellidos: string
}

interface Ambiente {
    nombre: string
}

interface CursoComplementario {
    id: string
    nombre: string
    areaFormacion: string
    fichaFormacion: string
    centroFormacion: string
    jornada: string
    instructorId: string
    ambienteId: string
    departamento: string
    ciudad: string
    duracion: number
    fechaInicio: string
    fechaFin: string
    cuposDisponibles: number
    imagen: string
    descripcion: string
    horarioDescripcion: string
    createdAt: string
    updatedAt: string
    instructor: Instructor
    ambiente: Ambiente
}

interface Solicitud {
    id: string
    fechaSolicitud: string
    origenSolicitud: string
    radicadoSolicitud: string
    segmento: string
    cuposSolicitados: number
    usuarioId: string
    empresaId: string
    usuarioInvitadoId: string
    tipoSolicitud: string
    cursoComplementarioId: string
    estadoSolicitud: string
    motivoSolicitud: string
    archivo: string
    createdAt: string
    updatedAt: string
    usuario: Persona
    empresa: Empresa
    usuarioInvitado: UsuarioInvitado
}

interface Empresa {
    id: string
    nit: string
    representanteLegal: string
    razonSocial: string
    correoElectronico: string
    celular: string
    direccion: string
    actividadEconomica: string
    departamento: string
    ciudad: string
    password: string
    foto: string
    createdAt: Date
    updatedAt: Date
}

interface Ambiente {
    id: string
    nombre: string
    capacidad: number
    centroFormacion: string
    createdAt: Date
    updatedAt: Date
}

interface Departamento {
    id: string
    departamento: string
    ciudades: array
}

interface Rol {
    id: string
    nombre: string
    descripcion: string
}

interface Login {
    numeroIdentificacion: string
    password: string
}
