var Saba;
(function (Saba) {
    var _Game_Actor_prototype_makeActions = Game_Actor.prototype.makeActions;
    Game_Actor.prototype.makeActions = function () {
        _Game_Actor_prototype_makeActions.call(this);
        if (this.actorId() === 5) {
            this.currentAction().setSkill(1291);
        }
    };
})(Saba || (Saba = {}));
//# sourceMappingURL=Skill_Eris.js.map