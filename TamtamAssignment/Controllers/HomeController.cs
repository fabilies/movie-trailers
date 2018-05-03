using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TamtamAssignment.Controllers
{
    public class HomeController : Controller
    {
        [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
        public class NoDirectAccessAttribute : ActionFilterAttribute
        {
            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
                if (filterContext.HttpContext.Request.UrlReferrer == null ||
                filterContext.HttpContext.Request.Url.Host != filterContext.HttpContext.Request.UrlReferrer.Host)
                {
                    filterContext.Result = new RedirectToRouteResult(new
                                              RouteValueDictionary(new { controller = "Home", action = "Index" }));
                }
            }
        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home - TamTam Film Trailers";

            return View();
        }

        [NoDirectAccess] //Prevent visiting by URL
        public ActionResult Video()
        {
            return View("Video");
        }

    }
}
