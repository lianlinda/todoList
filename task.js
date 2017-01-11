var taskApp=angular.module('taskApp',[]);
taskApp.controller('taskCtrl',['$scope',function($scope){
    $scope.id=0;
    $scope.allTasks = [];
    $scope.editable=false;
    $scope.tempTask = {};//用于编辑任务时数据临时存储
    $scope.index=-1;
    //检查任务名长度
    $scope.checkTaskName=function () {
        if($scope.newTask!=null && $scope.newTask.length<20){
            $scope.showError=false;
        }else{
            $scope.showError=true;
        }
    };
    //添加任务
	$scope.addTask=function () {
	    $scope.allTasks.push({id:$scope.id,taskName:$scope.newTask,taskTime:new Date(),isFinished:false});
	    $scope.id+=1;
	    $scope.newTask = '';
        $scope.isAllFinished();
    };
	//编辑任务
    $scope.editTask=function (index) {
        $scope.tempTask.taskName=$scope.allTasks[index].taskName;
        $scope.index = index;
    };
    //更新任务
    $scope.updateTask=function () {
        if($scope.allTasks[$scope.index].taskName!=$scope.tempTask.taskName){
            $scope.allTasks[$scope.index].taskName=$scope.tempTask.taskName;
            $scope.allTasks[$scope.index].taskTime=new Date();
        }
    };
    //确认是否删除任务
    $scope.isRemoveTask=function ($index) {
        /*var index;
        index=$scope.findTaskIndex($scope.allTasks,task);
        if(index!=-1){
            $scope.allTasks.splice(index,1);
        }*/
        $scope.tempTask.taskName=$scope.allTasks[$index].taskName;
        $scope.index=$index;
    };
    //删除任务
    $scope.removeTask=function () {
        /*var index;
         index=$scope.findTaskIndex($scope.allTasks,task);
         if(index!=-1){
         $scope.allTasks.splice(index,1);
         }*/
        $scope.allTasks.splice($scope.index,1);

    };
    //删除所有任务
    $scope.removeAllTasks=function () {
        $scope.allTasks=[];
        $scope.finishAll=false;
    };
    //计算全部任务的数量
    $scope.countAll=function () {
        return $scope.allTasks.length;
    };
    //计算未完成任务的数量
    $scope.countUnfinished=function () {
        var count=0;
        angular.forEach($scope.allTasks,function(task){
            if(!task.isFinished){
                count+=1;
            }
        });
        return count;
    };
    //计算已完成任务的数量
    $scope.countFinished=function () {
        var count=0;
        angular.forEach($scope.allTasks,function(task){
            if(task.isFinished){
                count+=1;
            }
        });
        return count;
    };
    //标记全部为已完成
    $scope.finishAllTask=function () {
        if($scope.finishAll){
            angular.forEach($scope.allTasks,function(task){
                if(task.isFinished){
                    task.beforeIsFinished=true;
                }
                task.isFinished=true;
            });
        }else{
            angular.forEach($scope.allTasks,function(task){
                if(task.beforeIsFinished){
                    task.isFinished=true;
                }else{
                    task.isFinished=false;
                }
                delete task.beforeIsFinished;
            });
        }
    };
    //检验是否全部已完成
    $scope.isAllFinished=function () {
        if($scope.countUnfinished()>0){
            $scope.finishAll=false;
        }else{
            $scope.finishAll=true;
        }
    };
    $scope.hasTask=function () {
        if($scope.allTasks.length<=0){
            return false;
        }else {
            return true;
        }
    };

    /*$scope.findTaskIndex=function (a,b) {
        if(!Array.isArray(a)){
            return -1;
        }
        if(a.length<=0){
            return -1;
        }else{
            for(var i=0;i<a.length;i++){
                if(a[i].id==b.id){
                    return i;
                }
            }
            return -1;
        }
    }*/
}]);
