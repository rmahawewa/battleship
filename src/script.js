exports.Ship = (length) => {

    let ship_array = [];

    let shipSkeltn = () => {
        for(let i=0; i<length; i++){
            ship_array[i] = 1;
        }
    }

    ship_array = shipSkeltn();

    let hit = (position) => {
        for(let i=0; i<length; i++){
            ship_array[i] = 0;
        }
        return ship_array;
    }

    let isSunk = (ship_array) => {
        sunk = false;
        let remainig_space = 0;
        for(let i=0; i<ship_array.length; i++){
            if(ship_array[i] === 1){
                remainig_space++;
            }
        }
        if(remainig_space > 0) { sunk=false; }
        else{ sunk=true; }

        return sunk;
    }

    let place_ship = (coordinates, coord1,coord2) => {
        let coords = [];
        if(coordinates.includes(coord1) && coordinates.includes(coord2)){
            if(coord1[0] == coord2[0] || (coord1[1] == coord2[1])){
                coords=[coord1,coord2];
            }
        }
        return coords;
    }

    return{ship_array, hit, isSunk, place_ship};

}

exports.Gameboard = () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let x_length = x.length;
    let y_length = y.length;

    let ships = [];
    let hit_ships = {};
    let missedShots = [];

    let xy_coordinates = () => {
        let coordinates = [];
        for(let i = 0; i<x_length; i++){
            for(let j = 0; j<y_length; j++){
                let x_coor = x[i];
                let y_coor = y[j];
                coordinates[i,j] = [x_coor,y_coor];
            }
        }
        return coordinates;
    }

    let add_ship = (coordinates,c1,c2, length) => {
        const ship = Ship(length);
        let valid_coordinates = ship.place_ship(coordinates,c1,c2);
        if(valid_coordinates.length > 0){
            let ship = [c1,c2];
            ships.push(ship);
        }
    }

    let receiveAttack = (c1,c2) => {
        for(let i=0; i<ships.length; i++){
            let ship = ships[i];
            let first_coordinate = ship[0];
            let last_coordinate = ship[1];            

            if(first_coordinate[0] - last_coordinate[0] == 0){
                if(c1 == first_coordinate[0] && c2 >= first_coordinate[1] && c2 <= last_coordinate[1]){
                    let ship_length = first_coordinate[1] - last_coordinate[1];
                    let position = c2 - first_coordinate[1];
                    let new_hit_ship = Ship(ship_length);
                    let new_hit_ship_position = new_hit_ship.hit(position);
                    let record = {
                        coordinates:[c1,c2],
                        ship_code : new_hit_ship,
                        hit_position: [
                            new_hit_ship_position,
                        ]
                    }
                    hit_ships.push(record);
                }else{
                    let missed = [c1,c2];
                    missedShots.push(missed);
                }
            }
            if(first_coordinate[1] - last_coordinate[1] == 0){
                if(c1 == first_coordinate[1] && c2 >= first_coordinate[0] && c2 <= last_coordinate[0]){
                    let ship_length = first_coordinate[0] - last_coordinate[0];
                    let position = c2 - first_coordinate[0];
                    let new_hit_ship = Ship(ship_length);
                    let new_hit_ship_position = new_hit_ship.hit(position);
                    let record = {
                        coordinates:[c1,c2],
                        ship_code: new_hit_ship,
                        hit_position:[
                            new_hit_ship_position,
                        ]
                    }
                    hit_ships.push(record);
                }else{
                    let missed = [c1,c2];
                    missedShots.push(missed);
                }
            }

            let missed = [c1,c2];
            missedShots.push(missed);

        }
    }

    // let number_of_sunken_ships = () => {
    //     for(let i=0; i<hit_ships.length; i++){

    //     }
    // }

}

exports.Player = () => {

    let gameBoard = Gameboard();

}




