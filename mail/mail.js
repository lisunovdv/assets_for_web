        $("#feedback2").submit(function() { 
            console.log(this.action);
    		var th = $(this);
    		$.ajax({
    			type: "POST",
    			url: this.action,
    			data: th.serialize()
    		}).done(function() {
    			alert("Thank you!");
    			setTimeout(function() {		
    				th.trigger("reset");
    			}, 1000);
    		});
    		return false;
    	});
