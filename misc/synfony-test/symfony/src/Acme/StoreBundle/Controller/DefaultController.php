<?php

namespace Acme\StoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Acme\StoreBundle\Entity\Product;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('AcmeStoreBundle:Default:index.html.twig', array('name' => $name));
    }
	
	public function createAction()
	{
	    $product = new Product();
	    $product->setName('A Foo Bar');
	    $product->setPrice('19.99');
	    $product->setDescription('Lorem ipsum dolor');
	
	    $em = $this->getDoctrine()->getManager();
	    $em->persist($product);
	    $em->flush();
	
	    return new Response('Created product id '.$product->getId());
	}
	
	public function searchAction()
	{
	    $em = $this->getDoctrine()->getManager();
		$query = $em->createQuery('SELECT p FROM AcmeStoreBundle:Product p WHERE p.price > :price ORDER BY p.price ASC')
			->setParameter('price', '10.00')
			/*->setParameters(array(
			    'price' => '10.00',
			    'name'  => 'Foo',
			))*/
			->setMaxResults(1);
		
		$products = $query->getResult();
		//$product = $query->getSingleResult();
		
		$printStr = '';
		foreach ($products as $product) {
	        $printStr = $printStr.$product->toString().' | ';
	    }

	    return new Response('Results: '.$printStr);
	}

	public function search2Action()
	{
		$repository = $this->getDoctrine()->getRepository('AcmeStoreBundle:Product');
		
		$query = $repository->createQueryBuilder('p')
		    ->where('p.price > :price')
		    ->setParameter('price', '10.00')
		    ->orderBy('p.price', 'ASC')
		    ->getQuery();
		
		// repository nutzen
		//$products = $this->getDoctrine()->getManager()->getRepository('AcmeStoreBundle:Product')->findAllOrderedByName();
			
		$products = $query->getResult();
		
		$printStr = '';
		foreach ($products as $product) {
	        $printStr = $printStr.$product->toString().' | ';
	    }

	    return new Response('Results: '.$printStr);
	}
	
	public function showAction($id)
	{
	    $product = $this->getDoctrine()
	        ->getRepository('AcmeStoreBundle:Product')
	        ->find($id);
	
	    if (!$product) {
	        throw $this->createNotFoundException('No product found for id '.$id);
	    }
		
		/*
		// query by the primary key (usually "id")
		$product = $repository->find($id);
		
		// dynamic method names to find based on a column value
		$product = $repository->findOneById($id);
		$product = $repository->findOneByName('foo');
		
		// find *all* products
		$products = $repository->findAll();
		
		// find a group of products based on an arbitrary column value
		$products = $repository->findByPrice(19.99);
		*/
	
	    // ... do something, like pass the $product object into a template
	    return new Response('product: '.$product->toString());
	}
	
	public function updateAction($id)
	{
	    $em = $this->getDoctrine()->getManager();
	    $product = $em->getRepository('AcmeStoreBundle:Product')->find($id);
	
	    if (!$product) {
	        throw $this->createNotFoundException('No product found for id '.$id);
	    }
	
	    $product->setName('New product name!');
	    $em->flush();
	
	    return $this->redirect($this->generateUrl('acme_store_homepage'));
	}

	public function removeAction($id)
	{
	    $em = $this->getDoctrine()->getManager();
	    $product = $em->getRepository('AcmeStoreBundle:Product')->find($id);
	
	    if (!$product) {
	        throw $this->createNotFoundException('No product found for id '.$id);
	    }
	
	    $em->remove($product);
		$em->flush();
	
	    return $this->redirect($this->generateUrl('acme_store_homepage'));
	}
}
