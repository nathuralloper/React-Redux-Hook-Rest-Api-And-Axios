import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICCION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';

// Crear un nuevo producto -- funcion principal
export function crearNuevoProductoAction(producto){
    return (dispatch) => {

        dispatch( nuevoProducto() );

        //insertar en la API
        clienteAxios.post('/productos', producto )
            .then(request => {
                console.log(request);
                //Si se inserta correctamente
                dispatch( agregarProductoExito(producto) );
            }).catch(error => {
                console.log(error);

                //Si hay un error
                dispatch ( agregarProductoError(error) );
            });       

    };
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

export function obtenerProductosAction(){
    return (dispatch) => {
        dispatch( obtenerProductosComienzo() );

        //consultar el api
        clienteAxios.get('/productos')
            .then(request => {
                dispatch( descargaProductosExitosa(request.data));
            }).catch(error => {
                dispatch( descargaProductoError() );
            });
    };
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
});

export const descargaProductoError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
});

//function para eliminar un producto en especifico
export function borrarProductosAction( id ) {
    return (dispatch) => {
        dispatch(obtenerProductoEliminar() );

        //Eliminar en la api
        clienteAxios.delete(`/productos/${id}`)
            .then(request => {                
                dispatch(eliminarProductoExito(id) );
            }).catch(error => {              
                dispatch(eliminarProductoError() );
            });
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
});

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
});


// obtener el producto a editar
export function obtenerProductoEditarAction(id) {
    return (dispatch) => {
        dispatch(obtenerProductoAction() );

        //obtener producto del api
        clienteAxios.get(`/productos/${id}`)
            .then(request => {
                dispatch(obtenerProductoEditarExito(request.data) );
            }).catch(error => {
                dispatch(obtenerProductoEditarError() );
            });
    };
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
});

//Modifica un producto en la apu y state
export function editarProductoAction( producto ){
    return (dispatch) => {
        dispatch(comenzarEdiccionProducto());

        //consultar la API
        clienteAxios.put(`/productos/${producto.id}`, producto)
            .then(request => {
                dispatch(editarProductoExito(request.data));
            }).catch(error => {
                dispatch(editarProductoError());
            });

    };
}

export const comenzarEdiccionProducto = () => ({
    type: COMENZAR_EDICCION_PRODUCTO
});

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
});
