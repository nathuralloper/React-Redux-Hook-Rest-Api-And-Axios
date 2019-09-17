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
                eliminarProductoError();
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


