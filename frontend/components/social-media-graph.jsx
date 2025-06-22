"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function SocialMediaGraph({ results = [] }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up the SVG
    const width = 1000;
    const height = 700;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define arrow marker
    svg.append('defs').append('marker')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#3b82f6')
      .style('stroke', 'none');

    // Create nodes from actual results
    const nodes = [
      { id: 'email', name: 'User Profile', type: 'email', group: 0 }
    ];

    // Add social media nodes from results
    results.forEach((result, index) => {
      nodes.push({
        id: result.title.toLowerCase().replace(/\s+/g, '_'),
        name: result.title,
        type: 'social',
        group: result.source === 'naminter' ? 1 : 2,
        url: result.url,
        source: result.source
      });
    });

    // Create links from email to each social media platform
    const links = nodes
      .filter(node => node.id !== 'email')
      .map(node => ({
        source: 'email',
        target: node.id,
        value: 0.8
      }));

    // Add some cross-platform connections for platforms that are likely connected
    const crossLinks = [];
    const socialPlatforms = nodes.filter(n => n.type === 'social' && n.id !== 'email');
    
    // Create some random cross-connections
    for (let i = 0; i < Math.min(socialPlatforms.length, 5); i++) {
      for (let j = i + 1; j < Math.min(socialPlatforms.length, i + 3); j++) {
        if (Math.random() > 0.5) {
          crossLinks.push({
            source: socialPlatforms[i].id,
            target: socialPlatforms[j].id,
            value: Math.random() * 0.3 + 0.2
          });
        }
      }
    }

    links.push(...crossLinks);

    // Create the force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))
      .force('x', d3.forceX().strength(0.1))
      .force('y', d3.forceY().strength(0.1));

    // Create the links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => d.source === 'email' ? '#3b82f6' : '#6b7280')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => d.value * 3)
      .attr('marker-end', 'url(#arrowhead)');

    // Create the nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.type === 'email' ? 35 : 20)
      .attr('fill', d => {
        switch(d.group) {
          case 0: return '#3b82f6'; // email
          case 1: return '#ef4444'; // naminter results
          case 2: return '#10b981'; // sherlock results
          default: return '#6b7280';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer');

    // Add text labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#fff')
      .style('font-size', d => d.type === 'email' ? '14px' : '11px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none');

    // Add click handler for social media nodes
    node.on('click', function(event, d) {
      if (d.url) {
        window.open(d.url, '_blank');
      }
    });

    // Add hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'email' ? 40 : 25);
      
      // Highlight connected links
      link.style('stroke-opacity', l => 
        l.source === d || l.target === d ? 1 : 0.1
      );
    })
    .on('mouseout', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'email' ? 35 : 20);
      
      // Reset link opacity
      link.style('stroke-opacity', 0.6);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [results]); // Re-run when results change

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
} 