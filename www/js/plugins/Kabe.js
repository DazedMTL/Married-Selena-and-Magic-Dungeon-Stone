var treeD;
(function (treeD) {
    function createCube1(scene) {
        var cube = BABYLON.MeshBuilder.CreateBox('fple-cube', { depth: 0.005, height: wallHeight, size: 1.0 }, scene);
        cube.setVerticesData(BABYLON.VertexBuffer.UVKind, getUvs());
        return cube;
    }
    function createCube2(scene) {
        var cube = BABYLON.MeshBuilder.CreateBox('fple-cube', { width: 0.005, height: wallHeight, size: 1.0 }, scene);
        cube.setVerticesData(BABYLON.VertexBuffer.UVKind, getUvs());
        return cube;
    }
    function getUvs() {
        return [
            0, 0, 1, 0,
            1, 1, 0, 1,
            1, 1, 0, 1,
            0, 0, 1, 0,
            0, 1, 0, 0,
            1, 0, 1, 1,
            0, 1, 0, 0,
            1, 0, 1, 1,
            1, 0, 1, 1,
            0, 1, 0, 0,
            0, 1, 0, 0,
            1, 0, 1, 1,
        ];
    }
    MBS.FPLE.Map.prototype._createCube1 = function (name, scene) {
        var cube;
        if (!this._cubeMesh1) {
            if (window.mesh1) {
                cube = window.mesh1;
            }
            else {
                cube = createCube1(scene);
            }
            cube.convertToUnIndexedMesh();
            this._cubeMesh1 = cube;
        }
        cube = this._cubeMesh1.clone(name);
        if (!scene.meshes.contains(cube)) {
            scene.addMesh(cube);
        }
        return cube;
    };
    MBS.FPLE.Map.prototype._createCube2 = function (name, scene) {
        var cube;
        if (!this._cubeMesh2) {
            cube = createCube2(scene);
            cube.convertToUnIndexedMesh();
            this._cubeMesh2 = cube;
        }
        cube = this._cubeMesh2.clone(name);
        if (!scene.meshes.contains(cube))
            scene.addMesh(cube);
        return cube;
    };
    MBS.FPLE.Map.prototype._applyTiles = function (scene) {
        var tile, row, col, filename, material, cube;
        var cubes = [], materials = [];
        var self = this;
        for (var x = 0; x < this._data.length; x++) {
            for (var y = 0; y < this._data[x].length; y++) {
                tile = this._data[x][y][0];
                col = (Math.floor(tile / 128) % 2 * 8 + tile % 8); // srsly?
                row = (Math.floor(tile % 256 / 8) % 16); // wow, such formula
                // The first tile at the first row is invisible
                if (col === 0 && row === 0)
                    continue;
                //p(row + ' ' + col)
                material = this.getMaterial($dataMap.tilesetId, row, col, scene);
                if (!materials.contains(material)) {
                    cubes.push([]);
                    materials.push(material);
                }
                var n = materials.indexOf(material);
                // Wall
                if ($gameMap.terrainTag(x, y) === MBS.FPLE.wallTerrain) {
                    if (this.isBorderFloor(x, y)) {
                        var cube1 = this._createCube1('wall' + x + '-' + y, scene);
                        cube1.position = new BABYLON.Vector3(-x, MBS.FPLE.wallHeight, y + 0.5);
                        cubes[n].push(cube1);
                        cube1 = this._createCube1('wall' + x + '-' + y, scene);
                        cube1.position = new BABYLON.Vector3(-x, MBS.FPLE.wallHeight, y - 0.5);
                        cubes[n].push(cube1);
                        var cube2 = this._createCube2('wall' + x + '-' + y, scene);
                        cube2.position = new BABYLON.Vector3(-x + 0.5, MBS.FPLE.wallHeight, y);
                        cubes[n].push(cube2);
                        cube2 = this._createCube2('wall' + x + '-' + y, scene);
                        cube2.position = new BABYLON.Vector3(-x - 0.5, MBS.FPLE.wallHeight, y);
                        cubes[n].push(cube2);
                    }
                }
                else {
                    // Floor
                    cube = this._createCube('floor' + x + '-' + y, scene);
                    cube.position = new BABYLON.Vector3(-x, MBS.FPLE.floorHeight, y);
                    cubes[n].push(cube);
                    // Ceiling
                    if ($gameMap.regionId(x, y) <= 10) {
                        cube = this._createCube('ceil' + x + '-' + y, scene);
                        cube.position = new BABYLON.Vector3(-x, MBS.FPLE.ceilHeight, y);
                        cubes[n].push(cube);
                    }
                }
                this.addExtraTile(x, y, scene, materials, cubes, this._data[x][y][1]);
                this.addExtraTile(x, y, scene, materials, cubes, this._data[x][y][2]);
            }
        }
        for (var i = 0; i < cubes.length; i++) {
            this._buildMesh(cubes[i], materials[i]);
        }
        /*
        if ([].concat.apply([], cubes).length > 128) {
            scene.createOrUpdateSelectionOctree(8, 2);
        }
        */
    };
    MBS.FPLE.Map.prototype.addExtraTile = function (x, y, scene, materials, cubes, tile) {
        if (tile == 0) {
            return;
        }
        var colB = (Math.floor(tile / 128) % 2 * 8 + tile % 8);
        var rowB = (Math.floor(tile % 256 / 8) % 16);
        if (colB <= 1) {
            colB += 4;
        }
        var material = this.getMaterial($dataMap.tilesetId, 1, Math.floor(colB / 2) + 1, scene);
        if (!materials.contains(material)) {
            cubes.push([]);
            materials.push(material);
        }
        var xx = colB % 2;
        var yy = rowB;
        var n = materials.indexOf(material);
        this.addWall(x, y, xx, yy, scene, cubes, n);
    };
    MBS.FPLE.Map.prototype.addWall = function (x, y, xx, yy, scene, cubes, n) {
        var hh = MBS.FPLE.wallHeight + (wallHeight - 1) / 2;
        switch (yy) {
            case 2:
                // 横
                if (xx == 0) {
                    this.addTop(x, y, xx, yy, scene, cubes, n);
                }
                else {
                    this.addBottom(x, y, xx, yy, scene, cubes, n);
                }
                break;
            case 3:
                // 縦
                if (xx == 0) {
                    this.addLeft(x, y, xx, yy, scene, cubes, n);
                }
                else {
                    this.addRight(x, y, xx, yy, scene, cubes, n);
                }
                break;
            case 4:
                if (xx == 0) {
                    this.addTop(x, y, xx, yy, scene, cubes, n);
                    this.addLeft(x, y, xx, yy, scene, cubes, n);
                }
                else {
                    this.addTop(x, y, xx, yy, scene, cubes, n);
                    this.addRight(x, y, xx, yy, scene, cubes, n);
                }
                break;
            case 5:
                if (xx == 0) {
                    this.addBottom(x, y, xx, yy, scene, cubes, n);
                    this.addLeft(x, y, xx, yy, scene, cubes, n);
                }
                else {
                    this.addBottom(x, y, xx, yy, scene, cubes, n);
                    this.addRight(x, y, xx, yy, scene, cubes, n);
                }
                break;
            case 6:
                if (xx == 0) {
                    this.addTop(x, y, xx, yy, scene, cubes, n);
                    this.addBottom(x, y, xx, yy, scene, cubes, n);
                }
                else {
                    this.addRight(x, y, xx, yy, scene, cubes, n);
                    this.addLeft(x, y, xx, yy, scene, cubes, n);
                }
                break;
        }
    };
    MBS.FPLE.Map.prototype.addTop = function (x, y, xx, yy, scene, cubes, n) {
        var hh = MBS.FPLE.wallHeight + (wallHeight - 1) / 2;
        var cube1 = this._createCube1('wall' + x + '-' + y, scene);
        cube1.position = new BABYLON.Vector3(-x, hh, y - 0.5);
        cubes[n].push(cube1);
    };
    MBS.FPLE.Map.prototype.addBottom = function (x, y, xx, yy, scene, cubes, n) {
        var hh = MBS.FPLE.wallHeight + (wallHeight - 1) / 2;
        var cube1 = this._createCube1('wall' + x + '-' + y, scene);
        cube1.position = new BABYLON.Vector3(-x, hh, y + 0.5);
        cubes[n].push(cube1);
    };
    MBS.FPLE.Map.prototype.addLeft = function (x, y, xx, yy, scene, cubes, n) {
        var hh = MBS.FPLE.wallHeight + (wallHeight - 1) / 2;
        var cube1 = this._createCube2('wall' + x + '-' + y, scene);
        cube1.position = new BABYLON.Vector3(-x + 0.5, hh, y);
        cubes[n].push(cube1);
    };
    MBS.FPLE.Map.prototype.addRight = function (x, y, xx, yy, scene, cubes, n) {
        var hh = MBS.FPLE.wallHeight + (wallHeight - 1) / 2;
        var cube1 = this._createCube2('wall' + x + '-' + y, scene);
        cube1.position = new BABYLON.Vector3(-x - 0.5, hh, y);
        cubes[n].push(cube1);
    };
})(treeD || (treeD = {}));
